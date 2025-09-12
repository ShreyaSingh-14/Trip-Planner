import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from './../../constants/Colors';

export default function UserTripCard({ trip }) {
  const LatestTrips = JSON.parse(trip.tripData);

  return (
    <View style={styles.container}>
      <Image
        source={
          trip.imageUrl
            ? { uri: trip.imageUrl }
            : require('./../../assets/images/placeholder.jpeg')
        }
        style={styles.tripImage}
        resizeMode="cover" 
      />

      <View style={styles.tripInfo}>
        <Text style={styles.tripName} numberOfLines={1}>
          {LatestTrips.locationInfo?.name}
        </Text>

        <Text style={styles.tripDate}>
          {moment(LatestTrips.startDate).format('DD MMM yyyy')}
        </Text>

        <Text style={styles.travelerInfo}>
          Travelling: {LatestTrips.travelerCount?.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  tripInfo: {
    marginLeft: 15,
    flex: 1,
  },
  tripName: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  tripDate: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 3,
  },
  travelerInfo: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.GRAY,
  },
});
