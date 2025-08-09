import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/favicon.png')} />
      
      <View>
        <Text style={styles.title}>Welcome to Trip Planner</Text>
        <Text style={styles.subtitle}>Please log in to continue</Text>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => router.push('/auth/sign-in')}>
          {/* we use router.push to still go back to the previous page */}
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1f1fbff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 99,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
