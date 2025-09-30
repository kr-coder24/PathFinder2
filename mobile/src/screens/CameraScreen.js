import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

const BACKEND_URL = 'http://10.0.2.2:8000';

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted.</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
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

  // Match FastAPI field name: images_bytes
  formData.append('images_bytes', {
    uri: photo.uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  // Add text description
  formData.append("text_descr", "This road has many potholes and cracks");

  fetch(`${BACKEND_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data", // some RN environments require this explicitly
    },
  })
    .then(data => data.json())
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
          <View style={styles.buttonInner}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 0,
    paddingBottom: 50,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});