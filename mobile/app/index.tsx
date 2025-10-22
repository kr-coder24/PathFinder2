import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      try {
        const auth = await import('@react-native-firebase/auth');
        const authInstance = auth.default();

        unsubscribe = authInstance.onAuthStateChanged((user) => {
          if (user) {
            router.replace('/home');
          } else {
            router.replace('/login');
          }
          setInitializing(false);
        });
      } catch (err: any) {
        console.error('Firebase initialization error:', err);
        setError(err.message || 'Failed to initialize Firebase');
        setInitializing(false);
        router.replace('/login');
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
