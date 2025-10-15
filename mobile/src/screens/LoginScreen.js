import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const auth = await import('@react-native-firebase/auth');
      await auth.default().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Login successful!');
      router.replace("/home");
    } catch (error) {
      let errorMessage = 'An error occurred during login';

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password sign-in is not enabled';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address first');
      return;
    }

    try {
      const auth = await import('@react-native-firebase/auth');
      await auth.default().sendPasswordResetEmail(email);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for instructions to reset your password'
      );
    } catch (error) {
      let errorMessage = 'Failed to send password reset email';

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstpart}>
        <Text style={styles.logoText}>PathFinder</Text>
      </View>

      <View style={styles.middlepart}>
        <TextInput
          style={styles.input}
          placeholder='Enter Email ID'
          placeholderTextColor={"black"}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter Password'
          placeholderTextColor={"black"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordQuestion}>Forgot password? </Text>
          <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
            <Text style={styles.resetPasswordLink}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newUserContainer}>
          <Text style={styles.newUser}>New User? </Text>
          <TouchableOpacity onPress={() => router.push("/register")} disabled={loading}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lastpart}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  firstpart:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText:{
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
  },
  middlepart:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastpart:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color:'black',
  },
  loginButton: {
    width:'80%',
    height:50,
    backgroundColor:'black',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
    shadowColor:'#000',
    shadowOffset:{ width: 0, height: 2 },
    shadowOpacity:0.2,
    shadowRadius:2,
    elevation:3,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newUserContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newUser: {
    fontSize: 14,
    color: 'black',
  },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordQuestion: {
    fontSize: 14,
    color: 'black',
  },
  resetPasswordLink: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
})

export default LoginScreen;
