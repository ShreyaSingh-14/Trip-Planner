import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../../constants/Colors';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
<<<<<<< HEAD
    <View style={{ height: '100%', padding: 25, paddingTop: 50, backgroundColor: Colors.WHITE }}>
=======
    <View style={{ padding: 25, paddingTop: 50, backgroundColor: Colors.WHITE }}>
>>>>>>> 484b39972ab3899cbb159399b8717ef0c324cf8b
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 35 }}>
        Create New Account
      </Text>

      {/* User Full Name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter Full Name" />
      </View>

      {/* Email Field */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
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
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Create Account</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
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
    marginBottom: 10,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'outfit',
    marginBottom: 5,
  },
  signInButton: {
<<<<<<< HEAD
    backgroundColor: Colors.PRIMARY,
=======
    backgroundColor: Colors.GRAY,
>>>>>>> 484b39972ab3899cbb159399b8717ef0c324cf8b
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
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
<<<<<<< HEAD
    borderColor: Colors.PRIMARY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});
=======
    borderColor: Colors.GRAY,
  },
  createAccountText: {
    color: Colors.GRAY,
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});
>>>>>>> 484b39972ab3899cbb159399b8717ef0c324cf8b
