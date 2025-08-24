import { View, Text, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from './../../constants/Colors';

export default function UserTripCard({ trip }) {
  const LatestTrips = JSON.parse(trip.tripData);

  return (
    <View
      style={{
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={
          trip.imageUrl
            ? { uri: trip.imageUrl }
            : require('./../../assets/images/placeholder.jpeg')
        }
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
        resizeMode="cover" 
      />

      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
          }}
          numberOfLines={1} // ✅ Prevent text overflow
        >
          {LatestTrips.locationInfo?.name}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(LatestTrips.startDate).format('DD MMM yyyy')}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Travelling: {LatestTrips.travelerCount?.title}
        </Text>
      </View>
    </View>
  );
}
