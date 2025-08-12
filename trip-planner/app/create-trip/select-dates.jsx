import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from '../../constants/Colors';


export default function selectDates() {
     const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({
        headerShown: true,  
        headerTransparent: true,
        headerTitle: 'Select Dates',
        });
    }, []);
  return (

    <View 
    style={{
      padding: 25,
      paddingTop: 75,
        backgroundColor:Colors.WHITE,
        height: '100%'
    }}
      >
      <Text
      style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        color: Colors.BLACK,
        marginTop: 20,
      }}>Travel Dates</Text>
    </View>
  )
}