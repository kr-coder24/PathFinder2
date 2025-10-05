//Added the code earlier present in index.tsx to this file.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomMapView from '../src/components/MapView';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const openCamera = () => {
    router.push('/camera'); // navigate to camera screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PathFinder</Text>
      <CustomMapView />
      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Ionicons name="camera" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}


//temporary css styling, will move it later
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
});