import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import Colors from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  if (!userTrips || userTrips.length === 0) return null;

  const [selectedTrip, setSelectedTrip] = useState(userTrips[0]); 
  const LatestTrips = JSON.parse(selectedTrip.tripData);
  const router = useRouter();

  const renderTrip = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedTrip(item)}>
      <UserTripCard trip={item} />
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 20 }}>
      {/* Header Card (Selected Trip Preview) */}
      <Image
        source={
          selectedTrip.imageUrl
            ? { uri: selectedTrip.imageUrl }
            : require('./../../assets/images/placeholder.jpeg')
        }
        style={{
          width: '100%',
          height: 240,
          borderRadius: 15,
        }}
        resizeMode="cover" 
      />

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 24 }}>
          {selectedTrip.tripPlan?.travelPlan?.location}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
            {moment(LatestTrips.startDate).format('DD MMM yyyy')}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
            🚌 {LatestTrips.travelerCount?.title}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/trip-details',
              params: { trip: JSON.stringify(selectedTrip) }, 
            })
          }
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 15,
            marginTop: 18,
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 15,
              color: Colors.WHITE,
              textAlign: 'center',
            }}
          >
            See your plan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <FlatList
        data={userTrips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTrip}
        scrollEnabled={false} 
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}
