import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from './../../../constants/Colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import { ToastAndroid } from 'react-native';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);


const OnCreateAccount = () => {
  if (!email || !password || !fullName) {
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
  
  if (password.length < 6) {
    ToastAndroid.show('Password must be at least 6 characters.', ToastAndroid.LONG);
    setIsLoading(false);
    return;
  }
  
  createUserWithEmailAndPassword(auth, email.trim(), password)
    .then((userCredential) => {
      const user = userCredential.user;
      router.replace('/mytrip');
      console.log('User created:', user);
    })
    .catch((error) => {
      let message = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          message = 'The email address is badly formatted.';
          break;
        case 'auth/weak-password':
          message = 'Password is too weak.';
          break;
        default:
          message = 'Error creating account. Please try again.';
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
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join us and start planning your perfect trips
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Full Name Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={Colors.GRAY} style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              onChangeText={(value) => setFullName(value)}
              placeholder="Enter your full name" 
              placeholderTextColor={Colors.GRAY}
              autoCapitalize="words"
            />
          </View>
        </View>

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

        {/* Create Account Button */}
        <TouchableOpacity 
          onPress={OnCreateAccount}
          style={[styles.createAccountButton, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.createAccountText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity 
          onPress={() => router.replace('/auth/sign-in')}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: 100,
    paddingHorizontal: 30,
    paddingBottom: 30,
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
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
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
  createAccountButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: 'outfit-medium',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signInButton: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    textAlign: 'center',
  },
  signInLink: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
});