import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';

export default function SignIn() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const router=useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
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
          placeholder="Enter your password" 
          placeholderTextColor={Colors.GRAY} 
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity 
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
  },
  title: {
    fontSize: 42,
    fontFamily: 'outfit-bold',
    color: Colors.BLACK,
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 30,
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
    borderWidth: 1,
    borderColor: Colors.BLACK,
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  createAccountText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit-bold',
  },
});
