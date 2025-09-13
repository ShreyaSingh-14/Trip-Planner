import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData } = React.useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    })
  }, [])

  const InfoCard = ({ icon, label, value }) => (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28, marginRight: 15 }}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 15,
            color: Colors.GRAY,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            marginTop: 3,
            color: Colors.DARK,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: Colors.WHITE, flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingTop: 80 }}
    >
      {/* Page Title */}
      <Text
        style={{
            marginTop:20,
          fontFamily: 'outfit-bold',
          fontSize: 36,
          marginBottom: 8,
          textAlign: 'left',
        }}
      >
        Review Your Trip 🔍
      </Text>
      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 16,
          color: Colors.GRAY,
          marginBottom: 25,
        }}
      >
        Before generating your trip, please review your selection.
      </Text>

      {/* Info Cards */}
      <InfoCard
        icon="📍"
        label="Destination"
        value={tripData?.locationInfo?.name}
      />
      <InfoCard
        icon="📅"
        label="Travel Date"
        value={`${moment(tripData?.startDate).format('DD MMM')} - ${moment(
          tripData?.endDate
        ).format('DD MMM')} (${tripData?.totalNoOfDays} days)`}
      />
      <InfoCard
        icon="🚌"
        label="Who is Traveling"
        value={
          tripData?.selectedTraveler?.title ||
          tripData?.selectedTraveler ||
          tripData?.travelerCount?.title ||
          tripData?.travelerCount
        }
      />
      <InfoCard icon="💵" label="Budget" value={tripData?.budget} />

      {/* CTA Button */}
      <TouchableOpacity
        style={{
          paddingVertical: 16,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 30,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 6,
          elevation: 4,
        }}
        onPress={() => router.replace('/create-trip/generate-trip')}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 18,
          }}
        >
          🚀 Make My Trip
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
