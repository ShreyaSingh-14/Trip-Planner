import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './../../../configs/FirebaseConfig';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const OnCreateAccount=()=>{
    if(!email || !password || !fullName)
      {
      ToastAndroid.show('Please fill all the details...', ToastAndroid.LONG);
      return;
    }
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    router.replace('/mytrip');
    console.log('User created');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.error('Error creating user:', errorCode, errorMessage);
  });
  }

  return (
    <View style={{ height:'100%', padding: 25, paddingTop: 50, backgroundColor: Colors.WHITE }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={{marginTop:20, marginBottom:20}} name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 35 }}>
        Create New Account
      </Text>

      {/* User Full Name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput 
        style={styles.input} 
        placeholder="Enter Full Name"
        onChangeText={(value)=>setFullName(value)} />
      </View>

      {/* Email Field */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={Colors.GRAY}
           onChangeText={(value)=>setEmail(value)} 
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={Colors.GRAY}
           onChangeText={(value)=>setPassword(value)} 
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity 
      onPress={OnCreateAccount}
      style={styles.signInButton}>
        <Text style={styles.signInText}>Create Account</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity 
      onPress={()=>router.replace('/auth/sign-in')}
      // we user replace to jump to the next page without mainting history or previous page
        style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Sign In</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    // marginBottom: 10,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'outfit',
    marginBottom: 5,
    fontSize: 16
  },
  signInButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  signInText: {
    color: '#fff',
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  createAccountButton: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },
});