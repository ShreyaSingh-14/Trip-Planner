import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import PlacesToVisit from '../../components/TripDetails/PlacesToVisit';
import { useRouter } from 'expo-router';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    if (trip) {
      try {
        const parsedTrip = JSON.parse(trip);
        if (parsedTrip.tripData) {
          parsedTrip.tripData = JSON.parse(parsedTrip.tripData);
        }
        setTripDetails(parsedTrip);
      } catch (error) {
        console.error('Error parsing trip JSON:', error);
      }
    }
  }, [trip]);

  if (!tripDetails) {
    return <Text>Loading trip details...</Text>;
  }

  return (
    <ScrollView>
      <Image
        source={
        tripDetails.imageUrl
          ? { uri: tripDetails.imageUrl } : require('./../../assets/images/placeholder.jpeg')
      }
        style={{
          width: '100%',
          height: 330,
        }}
      />
      <View style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        marginTop: -30,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>

        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
        }}>{tripDetails.tripData?.locationInfo?.name}</Text>
        {/* <Text>{tripDetails.tripPlan?.travelPlan?.location}</Text> */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GRAY,
            marginTop: 5
          }}>
            {moment(tripDetails.tripData?.startDate).format("DD MMM yyyy")} - {moment(tripDetails.tripData?.endDate).format("DD MMM yyyy")}
          </Text>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17,
            color: Colors.GRAY,
          }}>
            🚌  {tripDetails.tripData?.travelerCount?.title}
          </Text>
        </View>
        {/* flight info */}
        <FlightInfo flightData={tripDetails.tripPlan?.travelPlan?.flights} />
        {/* hotel info */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/trip-details/dayWisePlan',
              params: { trip: JSON.stringify(tripDetails) }
            })
          }>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            marginTop: 20,
            borderWidth: 1,
            backgroundColor: Colors.PRIMARY,
            borderColor: Colors.LIGHT_GRAY,
            padding: 10,
            marginLeft: 15,
            marginRight: 15,
            textAlign: 'center',
            borderRadius: 15,
            color: Colors.WHITE,
          }}>View Day Wise 📅 Plan</Text>
        </TouchableOpacity>
        <HotelList hotelList={tripDetails.tripPlan?.travelPlan?.hotels} />
        {/* places to visit */}
        <PlacesToVisit places={tripDetails.tripPlan?.travelPlan?.placesToVisit} />

      </View>
    </ScrollView>
  );
}
