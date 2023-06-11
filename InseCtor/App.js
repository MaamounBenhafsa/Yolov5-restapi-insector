import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, Text, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Sorry, we need camera roll permissions to make this work.'
      );
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result.uri);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const captureImageFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result.uri);
      }
    } catch (error) {
      console.log('Error capturing image:', error);
    }
  };

  const uploadImage = async (uri) => {
    if (!apiUrl) {
      console.log('API URL is not set.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImageName(response.data[0].name);
      console.log('Upload success:', response.data[0].name);
    } catch (error) {
      console.log('Error uploading image:', error);
      alert("Connection Err")
    }
  };

  const handleApiUrlChange = (text) => {
    setApiUrl(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="API URL"
        value={apiUrl}
        onChangeText={handleApiUrlChange}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Gallery"
          onPress={pickImageFromGallery}
          color="#841584"
        />
        <Button
          title="Camera"
          onPress={captureImageFromCamera}
          color="#841584"
        />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {uploadedImageName !== '' && <Text>Nom de L'INSECT : {uploadedImageName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;
