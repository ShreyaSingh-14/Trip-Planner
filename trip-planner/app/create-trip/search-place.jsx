import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = React.useContext(CreateTripContext);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const typingTimeout = useRef(null);

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
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1&limit=5`,
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
    }, 600); // Slightly faster feedback
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

      setTimeout(() => {
        router.push('/create-trip/select-traveler');
      }, 100);

      return updatedData;
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search a place..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleInputChange}
      />

      {/* Results List */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handlePlaceSelect(item)}
          >
            <Text style={styles.resultText} numberOfLines={2}>
              {item.display_name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.length >= 3 && (
            <Text style={styles.emptyText}>No results found</Text>
          )
        }
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
    borderColor: '#e0e0e0',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fafafa',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  resultItem: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  resultText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'outfit-medium',
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});
