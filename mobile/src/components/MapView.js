import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'

export default function CustomMapView() {
  const [location,setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async() => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setErrorMsg('Provide access to location premission to continue');
        Alert.alert('Location Permission', 'Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  },[]);
  const defaultRegion = {
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  
  //Accurate Location, but has some viewing issues and performance issues, disabled temporarily


  // Location.watchPositionAsync(
  //   {
  //     accuracy:Location.Accuracy.High,
  //     timeInterval:1000,
  //     distanceInterval:1,
  //   },
  //   (location) =>{
  //     setLocation(location);
  //   }
  // );
  const mapRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }: defaultRegion;
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={mapRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {location &&(
      <Marker
        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude}}
        title="Your Location"
        description='IIITA'
        pinColor='orange'
      />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
