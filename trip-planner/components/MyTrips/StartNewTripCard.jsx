import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
      }}
    >
      {/* Watermark image */}
      <Image
        source={require('../../assets/images/no_trip.png')}
        style={{
          width: 250,
          height: 200,
          marginBottom: 20,
          opacity: 0.5,
        }}
        resizeMode="contain"
      />

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'outfit-bold',
          color: Colors.DARK_GRAY,
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        No Trips Planned Yet
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'outfit',
          textAlign: 'center',
          color: Colors.GRAY,
          marginBottom: 25,
          lineHeight: 22,
        }}
      >
        Looks like it’s time to plan your next travel experience!  
        Tap below to get started.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={() => router.push('/create-trip/search-place')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 14,
          paddingHorizontal: 30,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Ionicons name="add-circle" size={22} color={Colors.WHITE} />
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 17,
          }}
        >
          Start a New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
