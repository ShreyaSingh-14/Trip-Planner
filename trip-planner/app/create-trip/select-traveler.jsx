import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';

export default function SelectTraveler() {
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  return (
    <View
      style={{
        paddingTop: 75,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          paddingLeft: 25,
          color: '#000',
          marginTop: 20,
        }}
      >
        Who is Travelling?
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 30,
          marginHorizontal: 100,
          backgroundColor: '#000',
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
         <Link href={'/create-trip/select-dates'}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: 'outfit',
            textAlign: 'center',
          }}
        >
          Go to Next Page
        </Text>
         </Link>
      </TouchableOpacity>
    </View>
  );
}
