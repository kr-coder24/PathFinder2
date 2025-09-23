import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { useRouter } from 'expo-router';

//Change to computer ip when running on phone
const BACKEND_URL = 'http://10.0.2.2:8000';

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if(!permission){
    return <View/>;
  }
  if(!permission.granted){
    return(
      <View style = {styles.container}>
        <Text>Camera permission not granted.</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        sendDataToBackend(photo);
      } catch (error) {
        console.error("Error taking picture: ", error);
        Alert.alert("Error", "Could not capture image.");
      }
    } else {
        Alert.alert("Permissions required", "Camera permission is needed to use this feature.");
    }
  };

  const sendDataToBackend = (photo) => {
    const formData = new FormData();
    
    formData.append('image', {
      uri: photo.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    fetch(`${BACKEND_URL}/api/process-image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      Alert.alert("Upload Successful", "Image sent to backend.");
      router.back();
    })
    .catch(error => {
      console.error('Error uploading data:', error);
      Alert.alert("Upload Failed", "Could not send image to the server.");
    });
  };
  return (
  <View style={styles.container}>
    <CameraView style={styles.camera} ref={cameraRef} facing="back" />

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.text}>Capture</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
