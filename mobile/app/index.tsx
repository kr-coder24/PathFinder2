import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomMapView from '../src/components/MapView';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PathFinder</Text>
      <Link href="/camera" style={styles.cameraButton}>
        <Text style={styles.cameraButtonText}>Open Camera</Text>
      </Link>
      <CustomMapView />
    </View>
  );
}

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
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  cameraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});