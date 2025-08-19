import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

export default function PlacesToVisit({ places = [] }) {
 

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 24,
          marginBottom: 15,
          textAlign: 'center',
        }}
      >
        ✨ Places to Visit ✨
      </Text>

      {places.map((place, index) => (
        <View
          key={index}
          style={{
            marginBottom: 20,
            borderRadius: 18,
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 3,
            overflow: 'hidden',
          }}
        >
          <Image
            source={
              place.imageUrl
                ? { uri: place.imageUrl }:require('./../../assets/images/placeholder.jpeg')
            }
            style={{
              width: '100%',
              height: 160,
            }}
          />
          <View style={{ padding: 15 }}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              {place.placeName}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 14,
                color: Colors.DARK_GRAY,
                lineHeight: 20,
                marginBottom: 8,
              }}
            >
              {place.details}
            </Text>
            <Text style={{ fontFamily: 'outfit' }}>
              🎫 Ticket Price: {place.ticketPricing || 'Free'}
            </Text>
            <Text style={{ fontFamily: 'outfit' }}>
              ⏱ Travel Time: {place.timeToTravel || 'N/A'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
