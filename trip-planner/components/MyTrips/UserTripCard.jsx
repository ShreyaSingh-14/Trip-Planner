import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Colors } from './../../constants/Colors';
<<<<<<< HEAD
export default function UserTripCard(trip) {
    const formatData=()=>{
        return JSON.parse(data);
    }
  return (
    <View style={{
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
      }}>
      <Image source={require('./../../assets/images/placeholder.jpeg')}
        style={{
            width:100,
            height:100,
            borderRadius: 15
        }}
      />
      <View>
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18
        }}>{trip.tripPlan?.travelPlan?.location}</Text>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color:Colors
        }}>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color:Colors
        }}>Traveling: {formatData(trip.tripData).traveler.title}</Text>
=======
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
>>>>>>> 78fcffab61259b5685b82ea0bca1ac0f2bd7f82b
      </View>
    </View>
  )
}