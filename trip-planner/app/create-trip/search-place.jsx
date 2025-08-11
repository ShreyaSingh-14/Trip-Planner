import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = React.useContext(CreateTripContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const typingTimeout = useRef(null);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  const searchPlaces = async (text) => {
    if (text.length < 3) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text
        )}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'Trip-Planner/1.0 (ashfame14@gmail.com)',
            'Accept-Language': 'en',
          },
        }
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error fetching places:', err);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      searchPlaces(text);
    }, 1000);
  };

  const handlePlaceSelect = (item) => {
    const coordinates = {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    };

    const placeUrl = `https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lon}#map=16/${item.lat}/${item.lon}`;

    setTripData((prev) => {
      const updatedData = {
        ...prev,
        locationInfo: {
          name: item.display_name,
          coordinates,
          photoRef: null,
          url: placeUrl,
        },
      };

      console.log('Selected place details saved:', updatedData.locationInfo);

      // Navigate back after state update
      setTimeout(() => {
        router.push('/create-trip/select-traveler');
      }, 100);

      return updatedData;
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search a place..."
        value={query}
        onChangeText={handleInputChange}
      />

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handlePlaceSelect(item)}
          >
            <Text style={styles.resultText}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
  },
  input: {
    marginTop: 20,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b0b0b0ff',
  },
  resultText: {
    fontSize: 16,
  },
});
