import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

export default function DayWisePlan() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const parsedTrip = trip ? JSON.parse(trip) : {};

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ""
    });
  }, [navigation]);

  console.log("Day Wise Plan Details:", parsedTrip);

  return (
    <ScrollView style={{ padding: 15, marginTop: 10 ,marginBottom: 40}}>
      <PlannedTrip details={parsedTrip.tripPlan?.travelPlan?.dayPlan || []} />
    </ScrollView>
  );
}
