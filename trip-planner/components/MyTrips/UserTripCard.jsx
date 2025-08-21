import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Colors } from './../../constants/Colors';
export default function UserTripCard({ trip }) {
  const LatestTrips = JSON.parse(trip.tripData);
  return (
    <View style={{
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    }}>
      <Image source={
        trip.imageUrl
          ? { uri: trip.imageUrl } : require('./../../assets/images/placeholder.jpeg')
      }
        style={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 15,
          marginTop: 10
        }} />

      <View style={{
      }}>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
        }}>
          {LatestTrips.locationInfo?.name}
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY
        }}>
          {moment(LatestTrips.startDate).format("DD MMM yyyy")}
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY
        }}>
          Travelling: {LatestTrips.travelerCount.title}
        </Text>
      </View>
    </View>
  )
}