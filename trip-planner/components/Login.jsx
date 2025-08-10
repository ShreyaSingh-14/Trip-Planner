import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors'; 

export default function Login() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./../assets/images/image.png')} 
        style={{
          width: '100%',
          height: 520,
          backgroundColor: Colors.WHITE
        }}
      />
      
      <View style={styles.container}>
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-bold'
        }}>AI Trip Planner </Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 16,
          marginTop: 20,
          textAlign: 'center',
          color: Colors.GRAY,
        }}>
          Discover the world with personalized travel plans. Personalize your journey with AI-driven itineraries tailored to your preferences. Trust us to make your travel dreams a reality.
        </Text>

        <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/auth/sign-in')}
      >
        <Text style={styles.buttonText}>Get Started </Text>
      </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  button: {
    marginTop: 30,
    marginTop:25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: Colors.PRIMARY, 
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.WHITE, 
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
    paddingLeft: 40,
    paddingRight: 40
  },
});
