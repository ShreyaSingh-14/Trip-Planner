import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';

export default function SelectBudget() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);
  return (
    <View style={{
        paddingTop:75,
        padding:25,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        margiTop:20,
        padding: 10,
      }}>Budget</Text>
    </View>
  )
}