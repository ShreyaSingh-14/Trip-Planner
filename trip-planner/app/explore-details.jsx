import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ExploreDetail() {
  const { category } = useLocalSearchParams();

  return (
    <View>
      <Text>Explore Detail Page</Text>
      <Text>Selected Category: {category}</Text>
    </View>
  );
}
