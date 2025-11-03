import React, { useEffect, useState, useRef} from 'react';
import { StyleSheet, Alert} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,Polyline } from 'react-native-maps';
import * as Location from 'expo-location'

export default function CustomMapView({routeRequest}) {
  const [location,setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);
  const API_BASE_URL ='http://10.0.2.2:8000';

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


  useEffect(() => {
    if(routeRequest.origin !== "" && routeRequest.destination !== ""){
      const origin = routeRequest.origin;
      const destination = routeRequest.destination;
      fetch(`${API_BASE_URL}/route?origin=${encodeURIComponent(origin)}&destination=${
      encodeURIComponent(destination)}`)
      .then(res => res.json())
      .then(data => {
        if( data.polyline && data.polyline.length > 0){
          const coords = data.polyline.map(([lat,lng]) => ({
            latitude: lat,
            longitude: lng,
          }));
          setRouteCoords(coords);
        }
        else{
          Alert.alert('Error', 'Could not find a route.');
          setRouteCoords([]);
        }
      })
      .catch(err => {
        console.error("Error fetching route: ",err);
        Alert.alert('Error', 'An error occured while fetching the route.');
      });

    }
  },[routeRequest]);
  //Accurate Location, but has some viewing issues and performance issues, disabled temporarily
  //test comment


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
  const defaultRegion = {
              latitude: 0.0,
              longitude: 0.0,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            };
  useEffect(() =>{
    if (routeCoords.length > 0 && mapRef.current){
      mapRef.current.fitToCoordinates(routeCoords,{
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  },[routeCoords]);
  const mapRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }: defaultRegion;
  return (
    <MapView
    ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={mapRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {location && (
        <Marker
          coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
          title="Your Location"
          description='IIITA'
          pinColor='orange'
        />
      )}
      
      {routeCoords.length > 0 && (
        <Polyline
          coordinates={routeCoords}
          strokeColor="blue"
          strokeWidth={4}
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
