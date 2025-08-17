import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Colors } from './../../constants/Colors';
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
      </View>
    </View>
  )
}