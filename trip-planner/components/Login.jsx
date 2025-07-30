import { View, Text,Image } from 'react-native'
import React from 'react'
export default function login() {
  return (
    <View style={{
        boxSizing: 'border-box',
        width: '100%', 
        height: 700,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1f1fbff',
    }}>
      <Image source={require('./../assets/images/favicon.png')} />
      <View>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 20,
        }}>Welcome to Trip Planner</Text>
        <Text style={{
            fontSize: 16,
            color: '#555',
            marginTop: 10,
            textAlign: 'center',
        }}>Please log in to continue</Text>
      </View>
    </View>
  )
}