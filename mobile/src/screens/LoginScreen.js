import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
        />
        <TextInput
          style={styles.input}
          placeholder='Enter Password'
          placeholderTextColor={"black"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.newUserContainer}>
          <Text style={styles.newUser}>New User? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
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
})

export default LoginScreen;
