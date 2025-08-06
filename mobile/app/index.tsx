import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomMapView from '../src/components/MapView';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PathFinder</Text>
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
});