import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
const LoginScreen = ({  }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState({})

  //useNavigation la hook
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        //displayName hien tai la null
        //console.log(user.displayName);

        //replace thay the cai route hien tai thanh 1 cai moi 
        navigation.replace("List")
      }
    })

    return unsubscribe
  }, [])


        //userCredentials: thong tin nguoi dung
//         const user = userCredentials.user;
//         console.log('Registered with:', user.email);
//         console.log('Logged in with:', user.email);

const handleSignUp = async () => {
    try {
    const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    console.log(user,'Signed up: ', auth.currentUser?.email);
  
    } catch (error)
    {
        console.log(error.message);
    }
}

const handleLogin = async () => {
    try {
        const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        
        console.log(user,'Logged in with:', auth.currentUser?.email)
        
        } catch (error)
        {
            console.log(error.message);
        }
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        
        

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate('List')}}
          style={[styles.button, styles.buttonOutline1]}
        >
          <Text style={styles.buttonOutlineText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical:10,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutline1: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#b388ff',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
