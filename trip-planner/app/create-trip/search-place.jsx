import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const typingTimeout = useRef(null);

  const popularPlaces = ['New York', 'Paris', 'Tokyo', 'London', 'Sydney', 'Delhi', 'Bali'];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const searchPlaces = async (text) => {
    if (text.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      searchPlaces(text);
    }, 500);
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
      {/* Fancy Header */}
      <Text style={styles.header}>Find Your Next Adventure 🌍</Text>
      <Text style={styles.subHeader}>Search for any city, landmark, or hidden gem</Text>

      {/* Popular Suggestions */}
      {query.length === 0 && (
        <View style={styles.suggestionsContainer}>
          {popularPlaces.map((place, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.suggestionChip}
              onPress={() => handleInputChange(place)}
            >
              <Text style={styles.suggestionText}>{place}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search a place..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleInputChange}
      />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="small" color={Colors.PRIMARY} style={{ marginTop: 10 }} />}

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
              📍 {item.display_name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.length >= 3 && !loading && (
            <Text style={styles.emptyText}>No results found 🙅🏻</Text>
          )
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
  },
  header: {
    marginTop:10,
    fontSize: 36,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    color: '#666',
    marginBottom: 15,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  suggestionChip: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
  },
  input: {
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
