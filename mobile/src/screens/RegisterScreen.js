import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.firstpart}>
        <Text style={styles.logoText}>PathFinder</Text>
      </View>

      <View style={styles.middlepart}>
        <TextInput
          style={styles.input}
          placeholder='Enter Name'
          placeholderTextColor={"black"}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder='Enter Email ID'
          placeholderTextColor={"black"}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />

        <TextInput
          style={styles.input}
          placeholder='Set Password'
          placeholderTextColor={"black"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          placeholderTextColor={"black"}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.existingUserContainer}>
          <Text style={styles.existingUser}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.login}>Login</Text>
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
  registerButton: {
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
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  existingUserContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  existingUser: {
    fontSize: 14,
    color: 'black',
  },
  login: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
})

export default RegisterScreen;
