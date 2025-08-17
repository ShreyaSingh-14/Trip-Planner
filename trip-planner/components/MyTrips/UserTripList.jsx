import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors';
import UserTripCard from './UserTripCard';
import moment from 'moment';

export default function UserTripList({userTrips}) {
  const LatestTrips= JSON.parse(userTrips[0].tripData);
  
  return userTrips&& (
    <View>
      <View style={{
        margintop:20
      }}>
        <Image source={require('./../../assets/images/placeholder.jpeg')} 
        style={{
          width:'100%',
          height:240,
          objectFit:'cover',
          borderRadius:15
        }}
        />
        <View style={{margintop:10}}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20
          }}>{userTrips[0]?.tripPlan?.travelPlan?.location}</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
          }}>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.GRAY
              }}>{moment(LatestTrips.startDate).format('DD MMM YYYY')}</Text>
              <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                color: Colors.GRAY
              }}>🚌 {LatestTrips.traveler.title}</Text>
          </View>
          <TouchableOpacity 
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15
            }}><Text style={{
              fontFamily: 'outfit-medium',
              color: Colors.WHITE,
              textAlign: 'center',
              fontSize: 15
            }}>See your plan</Text></TouchableOpacity>
        </View>

        {userTrips.map((trip,index)=>(
          <UserTripCard trip={trip} key={index}/>
        ))}
      </View>
    </View>
  )
}