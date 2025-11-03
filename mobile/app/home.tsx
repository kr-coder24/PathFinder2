import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomMapView from '../src/components/MapView';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location'
import  SearchBar  from '../src/components/SearchBar';

export default function HomeScreen() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeRequest, setRouteRequest] = useState({
    origin: "",
    destination: ""
  });

  useEffect(() => {
    (async ()=> {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        Alert.alert('Permission access to location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      if(reverseGeocode.length > 0){
        const address = reverseGeocode[0];
        setOrigin(`${address.name}, ${address.city}, ${address.region}`); //sets current location as origin
      }
    })();
  },[]);

  const handleGetRoute = () =>{
    if(!origin || !destination){
      Alert.alert('Please enter both origin and destination');
      return;
    }
    setRouteRequest({origin:origin,destination:destination});
  }

  const openCamera = () => {
    router.push('/camera');
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              const auth = await import('@react-native-firebase/auth');
              await auth.default().signOut();
              router.replace('/login');
            } catch (error: any) {
              let errorMessage = 'Failed to logout. Please try again.';

              if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection.';
              } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many attempts. Please try again later.';
              } else if (error.message) {
                errorMessage = error.message;
              }

              console.error('Logout error:', error);
              Alert.alert('Logout Failed', errorMessage);
            } finally {
              setIsLoggingOut(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.userIconButton} onPress={toggleDashboard}>
          <Ionicons name="person-circle-outline" size={36} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showDashboard && (
        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>User Dashboard</Text>
          <Text style={styles.dashboardText}>Profile settings and info coming soon...</Text>
          <TouchableOpacity
            style={styles.closeDashboard}
            onPress={() => setShowDashboard(false)}
          >
            <Text style={styles.closeDashboardText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      <SearchBar
        origin={origin}
        onOriginChange={setOrigin}
        destination={destination}
        onDestinationChange={setDestination}
        onGetRoute={handleGetRoute}
      />

      <CustomMapView routeRequest={routeRequest}/>
      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Ionicons name="camera" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  userIconButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dashboard: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dashboardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  closeDashboard: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeDashboardText: {
    color: '#fff',
    fontWeight: 'bold',
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
    elevation: 5,
  },
});
