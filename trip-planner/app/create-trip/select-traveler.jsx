import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigation } from 'expo-router';
import Colors from './../../constants/Colors';
import { SelectTravelesList } from './../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  useEffect(() => {
    setTripData({
      ...tripData,
      travelerCount: selectedTraveler,
    });
  }, [selectedTraveler]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 65,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 36,
          paddingLeft: 25,
          color: Colors.PRIMARY,
          marginTop: 30,
        }}
      >
        Who's Travelling?🤷🏻
      </Text>

      {/* Subtitle */}
      <View style={{ marginTop: 15, paddingHorizontal: 25 }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 23,
            marginBottom: 10,
          }}
        >
          Choose your travelers
        </Text>

        <FlatList
          data={SelectTravelesList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 8,
              }}
              activeOpacity={0.7}
            >
              <OptionCard option={item} selectedOption={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: selectedTraveler ? Colors.PRIMARY : Colors.LIGHT_GRAY,
          borderRadius: 15,
          marginTop: '20',
          marginHorizontal: 25,
          marginBottom: 30,
        }}
        disabled={!selectedTraveler}
      >
        <Link
          href="/create-trip/select-dates"
          style={{
            width: '100%',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 20,
            }}
          >
            Continue
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
