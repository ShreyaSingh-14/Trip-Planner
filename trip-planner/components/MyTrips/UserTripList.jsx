import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
import Colors from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  const LatestTrips = JSON.parse(userTrips[0].tripData);
  const router = useRouter();
  return userTrips && (
    <View>
      <View style={{
        marginTop: 20,
      }}>
          <Image source={
        userTrips[0].imageUrl
          ? { uri: userTrips[0].imageUrl } : require('./../../assets/images/placeholder.jpeg')
      }
            style={{
              width: "100%",
              height: 240,
              obejctFit: 'cover',
              borderRadius: 15,
            }} />
        <View style={{
          marginTop: 10,
        }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 24,
          }}>
            {userTrips[0].tripPlan?.travelPlan?.location}
          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 17,
              color: Colors.GRAY
            }}>
              {moment(LatestTrips.startDate).format("DD MMM yyyy")}
            </Text>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 17,
              color: Colors.GRAY
            }}>
              🚌 {LatestTrips.travelerCount.title}
            </Text>
          </View>
          <TouchableOpacity 
          onPress={() => router.push({pathname:'/trip-details', params:{trip:JSON.stringify(userTrips[0])}})}
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 18,
            }}>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 15,
              color: Colors.WHITE,
              textAlign: 'center'
            }}>See your plan</Text>
          </TouchableOpacity>
        </View>
        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  )
}