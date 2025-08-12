import React, { useState, useEffect, use } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';

function getDatesBetween(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const dates = {};
  const router = useRouter();
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    dates[dateStr] = {
      color: Colors.PRIMARY,
      textColor: Colors.WHITE,
    };
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const onDayPress = (day) => {
    const selectedDate = day.dateString;

    // If no start OR both selected, reset selection
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else {
      // Ensure the end date is not before start date
      if (new Date(selectedDate) < new Date(startDate)) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        const diffInMs = new Date(selectedDate) - new Date(startDate);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays > 30) {
          Alert.alert('Limit Exceeded', 'You can only select a range up to 15 days.');
        } else {
          setEndDate(selectedDate);
        }
      }
    }
  };

  // Prepare marked dates
  let markedDates = {};
  if (startDate && endDate) {
    markedDates = {
      ...getDatesBetween(startDate, endDate),
      [startDate]: { startingDay: true, color: Colors.PRIMARY, textColor: Colors.WHITE },
      [endDate]: { endingDay: true, color: Colors.PRIMARY, textColor: Colors.WHITE },
    };
  } else if (startDate) {
    markedDates = {
      [startDate]: {
        selected: true,
        color: Colors.PRIMARY,
        textColor: Colors.WHITE,
      },
    };
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Title */}
      <Text
        style={{
          marginTop: 20,
          fontFamily: 'outfit-bold',
          fontSize: 35,
          color: Colors.BLACK,
          marginBottom: 20,
        }}
      >
        Travel Dates
      </Text>

      {/* Calendar */}
      <Calendar
        onDayPress={onDayPress}
        markingType={'period'}
        markedDates={markedDates}
        theme={{
          todayTextColor: Colors.PRIMARY,
          arrowColor: Colors.PRIMARY,
          selectedDayBackgroundColor: Colors.PRIMARY,
          selectedDayTextColor: Colors.WHITE,
        }}
        style={{
          borderRadius: 10,
          elevation: 2,
        }}
      />

      {/* Start & End Dates */}
      <View
        style={{
          marginTop: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.LIGHT_GRAY,
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginRight: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: Colors.BLACK, opacity: 0.6 }}>Start Date</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.BLACK }}>
            {startDate || '--'}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: Colors.LIGHT_GRAY,
            padding: 15,
            borderRadius: 10,
            flex: 1,
            marginLeft: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: Colors.BLACK, opacity: 0.6 }}>End Date</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.BLACK }}>
            {endDate || '--'}
          </Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={{
          backgroundColor: startDate && endDate ? Colors.PRIMARY : Colors.LIGHT_GRAY,
          paddingVertical: 15,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 30,
        }}
        disabled={!startDate || !endDate}
        onPress={() => {
          console.log("Selected range:", startDate, "to", endDate);
          router.push('/create-trip/select-budget');
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
