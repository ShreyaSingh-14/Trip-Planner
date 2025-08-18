import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function TripDetails() {
  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    })
  })
  return (
    <View>
      <Text>TripDetails</Text>
    </View>
  )
}