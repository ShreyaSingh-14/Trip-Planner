import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';

export default function SelectTraveler() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ 
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });}, []);
  return (
     <View style={{ 
        paddingTop: 25, 
     paddingTop: 75, 
     backgroundColor: '#fff',
     height: '100%',
     }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
            paddingLeft: 25,
            color: '#000',
            marginTop: 20,
        }}
        >Who is Travelling?</Text>
        </View>
)
}