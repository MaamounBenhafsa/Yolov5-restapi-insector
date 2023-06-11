# YOLOv5 Insect Recognition API Documentation

The YOLOv5 Insect Recognition API is a Flask application that allows users to upload images and perform insect recognition using the YOLOv5 model. This documentation provides an overview of the API's functionality, its endpoints, and how to use them.

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Upload an Image](#upload-an-image)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Running the Application](#running-the-application)

## Getting Started
To use the YOLOv5 Insect Recognition API, follow the steps below:

1. Install the necessary dependencies:
   - Flask: `pip install flask`
   - Torch: `pip install torch`
   - Pillow: `pip install pillow`

2. Download the YOLOv5 model:
   - Visit the [YOLOv5 GitHub repository](https://github.com/ultralytics/yolov5) and download the `best.pt` model file.
   - Save the `best.pt` model file in the same directory as the API code.

3. Set up the Flask application:
   - Create a new Python file (e.g., `app.py`) and copy the API code into it.

4. Configure the API:
   - Open the `app.py` file and modify the following variables as needed:
     - `app.config['UPLOAD_FOLDER']`: Specify the folder where uploaded images will be stored.
     - `app.config['ALLOWED_EXTENSIONS']`: Define the allowed file extensions for uploads.
     - `model_path`: Set the path to the `best.pt` model file.
     - `model.conf`: Adjust the confidence threshold for object detection (default is `0.5`).

5. Start the API:
   - Run the Flask application by executing the `app.py` file.
   - The API will start running on the specified host and port (default is `http://localhost:5000`).

## API Endpoints

### Upload an Image
**Endpoint:** `/upload`  
**Method:** POST

Uploads an image file for insect recognition.

#### Request Parameters
- `photo` (file): The image file to be uploaded.

#### Response
If the image is successfully uploaded and processed, the API will return a JSON response containing the detected objects in the image.

- HTTP Status Code: 200 (OK)
- Content-Type: application/json
- Response Body: An array of objects representing the detected insects. Each object has the following properties:
  - `name`: The name or label of the detected insect.
  - `xmin`: The x-coordinate of the top-left corner of the bounding box.
  - `ymin`: The y-coordinate of the top-left corner of the bounding box.
  - `xmax`: The x-coordinate of the bottom-right corner of the bounding box.
  - `ymax`: The y-coordinate of the bottom-right corner of the bounding box.
- Example Response:
```json
[
  {
    "name": "bee",
    "xmin": 100,
    "ymin": 200,
    "xmax": 300,
    "ymax": 400
  },
  {
    "name": "butterfly",
    "xmin": 400,
    "ymin": 100,
    "xmax": 600,
    "ymax": 300
  }
]
```

#### Error Responses
- HTTP Status Code: 400 (Bad Request)
  - Response Body: `Error: Invalid file`
  - Description: Occurs when the uploaded file is not a valid image