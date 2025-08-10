import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function SignIn() {
  const navigation = useNavigation();
  const router=useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);


const OnSignIn=()=>{
  if(!email || !password) {
    ToastAndroid.show('Please fill all the details...', ToastAndroid.LONG);
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(emailPattern.test(email.trim())))
    {
      ToastAndroid.show('Please enter a valid email address.', ToastAndroid.LONG);
    return;
  }
  signInWithEmailAndPassword(auth, email.trim(), password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('/mytrip');
    console.log('User signed in:', user);
    // ...
  })
 .catch((error) => {
  // console.error('Firebase sign-in error:', error.code, error.message); // debug log

  let message = '';
  switch (error.code) {
    case 'auth/invalid-email':
      message = 'The email address is badly formatted.';
      break;
    case 'auth/user-not-found':
      message = 'No user found with this email.';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password.';
      break;
    default:
      message = 'Error signing in. Please try again.';
  }
  ToastAndroid.show(message, ToastAndroid.LONG);
});
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons style={{marginTop:20}} name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to your account.
        </Text>
        <Text style={styles.subtitle}>
          Explore new features.
        </Text>
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={(value) => setEmail(value)}
          placeholder="Enter your email" 
          placeholderTextColor={Colors.GRAY} 
        />
      </View>


      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          secureTextEntry={true} 
          style={styles.input} 
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter your password" 
          placeholderTextColor={Colors.GRAY} 
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity 
      onPress={OnSignIn}
      // we use onPress to call the function to sign in
      style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity 
      onPress={()=>router.replace('/auth/sign-up')}
      // we user replace to jump to the next page without mainting history or previous page
      style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.WHITE,
    paddingTop: 50,
    height: '100%', 
  },
  header: {
    marginBottom: 40,
    marginTop: 20
  },
  title: {
    fontSize: 35,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'outfit',
    color: Colors.GRAY,

  },
  inputContainer: {
    marginTop: 5,
  },
  label: {
    marginLeft: 5,
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.BLACK,
  },
  input: {
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    marginBottom: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: Colors.BLACK,
    padding: 15,
    borderRadius: 15,
    marginTop: 40,
  },
  signInText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit-bold',
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
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit-bold',
  },
});
