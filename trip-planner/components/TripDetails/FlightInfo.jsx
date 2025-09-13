import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FlightInfo({ flightData, isPremiumUser = false }) {
  const router = useRouter();

  return (
    <View style={{
      marginTop: 20,
      borderColor: Colors.LIGHT_GRAY,
      borderWidth: 1,
      padding: 10,
      borderRadius: 15,
      position: 'relative',
    }}>
      {/* Original Content */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}>✈️ Flights</Text>
        <TouchableOpacity style={{
          backgroundColor: Colors.PRIMARY,
          padding: 5,
          width: 100,
          borderRadius: 7,
          marginTop: 7,
        }}>
          <Text style={{
            fontFamily: 'outfit',
            color: Colors.WHITE,
            textAlign: 'center',
          }}>Book Here</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 5,
      }}>Airlines: Delta</Text>
      
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
      }}>Price: {flightData?.[0]?.price}</Text>

      {/* Blur Overlay for Non-Premium Users */}
      {!isPremiumUser && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
  {/* Lock Emoji */}
    <Text style={{
      fontSize: 40,
    }}>🔒</Text>
          
          {/* Activate Premium Button */}
          <TouchableOpacity
            onPress={() => router.push('/premium')}
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 15,
              marginBottom:10
            }}
          >
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: Colors.WHITE,
            }}>Activate ✨Premium✨</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}