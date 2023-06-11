from flask import Flask, request
from werkzeug.utils import secure_filename
import torch
from PIL import Image
from pathlib import Path

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

model_path = 'best.pt'

model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)
model.conf = 0.5

@app.route('/upload', methods=['POST'])
def upload():
    if 'photo' in request.files:
        photo = request.files['photo']
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            image_path = Path(app.config['UPLOAD_FOLDER']) / filename
            photo.save(str(image_path))
            result = detect_objects(image_path)
            return result

    return 'Error: Invalid file'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def detect_objects(image_path):
    image = Image.open(image_path)
    results = model(image)
    objects = results.pandas().xyxy[0]
    return objects.to_dict(orient='records')

if __name__ == '__main__':
    app.run(host="192.168.1.109", debug=True)
