import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../../constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import { ToastAndroid } from 'react-native';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);



const OnSignIn = () => {
  if (!email || !password) {
    ToastAndroid.show('Please fill all the details...', ToastAndroid.LONG);
    return;
  }
  
  setIsLoading(true);
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(emailPattern.test(email.trim()))) {
    ToastAndroid.show('Please enter a valid email address.', ToastAndroid.LONG);
    setIsLoading(false);
    return;
  }
  
  signInWithEmailAndPassword(auth, email.trim(), password)
    .then((userCredential) => {
      const user = userCredential.user;
      router.replace('/mytrip');
      console.log('User signed in:', user);
    })
    .catch((error) => {
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
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  return (
    <View style={styles.container}>
      {/* Minimal Header */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack && router.canGoBack()) {
            router.back();
          } else {
            router.replace('/components/Login');
          }
        }}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your journey
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={Colors.GRAY} style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter your email" 
              placeholderTextColor={Colors.GRAY}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={Colors.GRAY} style={styles.inputIcon} />
            <TextInput 
              secureTextEntry={!showPassword}
              style={styles.input} 
              onChangeText={(value) => setPassword(value)}
              placeholder="Enter your password" 
              placeholderTextColor={Colors.GRAY}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={Colors.GRAY} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity 
          onPress={OnSignIn}
          style={[styles.signInButton, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.signInText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <TouchableOpacity 
          onPress={() => router.replace('/auth/sign-up')}
          style={styles.createAccountButton}
        >
          <Text style={styles.createAccountText}>
            Don't have an account? <Text style={styles.createAccountLink}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    paddingTop: 120,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: Colors.PRIMARY,
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.PRIMARY,
    paddingVertical: 15,
  },
  eyeIcon: {
    padding: 5,
  },
  signInButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginTop: 30,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'outfit-medium',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  createAccountButton: {
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 15,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    textAlign: 'center',
  },
  createAccountLink: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
});
