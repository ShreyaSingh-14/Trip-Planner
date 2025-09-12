import { View, Text, Image, FlatList, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';
import moment from 'moment';
import Colors from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  if (!userTrips || userTrips.length === 0) return null;

  const [selectedTrip, setSelectedTrip] = useState(userTrips[0]);
  const router = useRouter();

  // Parse trip data only once per selection
  const latestTripData = useMemo(
    () => JSON.parse(selectedTrip.tripData),
    [selectedTrip]
  );

  // Cards shrink on press
  const renderTrip = ({ item }) => (
    <Pressable
      android_ripple={null} //  removes grey ripple
      onPress={() => setSelectedTrip(item)}
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.97 : 1 }] }, // shrink slightly
      ]}
    >
      <UserTripCard trip={item} />
    </Pressable>
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
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.headerContent}>
        <Text style={styles.tripTitle}>
          {selectedTrip.tripPlan?.travelPlan?.location}
        </Text>

        <View style={styles.tripMeta}>
          <Text style={styles.metaText}>
            {moment(latestTripData.startDate).format('DD MMM yyyy')}
          </Text>
          <Text style={styles.metaText}>
            🚌 {latestTripData.travelerCount?.title}
          </Text>
        </View>

        {/* Button is normal TouchableOpacity, no scale effect */}
        <TouchableOpacity
          // activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: '/trip-details',
              params: { trip: JSON.stringify(selectedTrip) },
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>See your plan</Text>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <FlatList
        data={userTrips}
        keyExtractor={(item, index) => index.toString()} // better if you have trip.id
        renderItem={renderTrip}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        contentContainerStyle={{ marginTop: 20 }}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 240,
    borderRadius: 15,
  },
  headerContent: {
    marginTop: 10,
  },
  tripTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 24,
  },
  tripMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  metaText: {
    fontFamily: 'outfit',
    fontSize: 17,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 18,
  },
  buttonText: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
