import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { db } from '../../configs/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import CategoryList from '../../components/CategoryList';
import FeaturedList from '../../components/FeaturedList';

export default function DiscoverPage() {
  const [exploreData, setExploreData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    fetchExploreData();
    fetchFeaturedData();
  }, []);

  // Fetch Explore places
  const fetchExploreData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Explore'));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExploreData(tempData);
    } catch (err) {
      console.error('Error fetching explore data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Featured places
  const fetchFeaturedData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Featured'));
      const tempData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        discount: doc.data().Discount,
        image: doc.data().ImageUrl || 'https://via.placeholder.com/400x300',
      }));
      setFeaturedData(tempData);
    } catch (err) {
      console.error('Error fetching featured data:', err);
    }
  };

  const filteredData =
    selectedCategory === 'All'
      ? exploreData
      : exploreData.filter(
          (item) =>
            (item.Category || '').toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
  
    >
      <Image
        source={{ uri: item.ImageUrl || 'https://via.placeholder.com/110' }}
        style={styles.placeImage}
        resizeMode="cover"
      />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>📍 {item.place}</Text>
        <Text style={styles.placeCategory}>{item.Category || 'Uncategorized'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover Places 🌎</Text>
        <Text style={styles.subHeader}>
          Explore categories and find amazing places around you
        </Text>
      </View>

      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}

      {/* Featured Section */}
      {featuredData.length > 0 && (
        <FeaturedList data={featuredData} onPressPlace={(item) => router.push(`/place/${item.id}`)} />
      )}
    <Text style={{ fontSize: 25,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
    marginLeft: 15,
    marginBottom: 10,}}>Category 🧮</Text>
      {/* Category List */}
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Places List */}
      <FlatList
        data={filteredData}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // ScrollView handles scrolling
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { padding: 20, marginTop: 5 },
  header: {
    fontSize: 36,
    marginTop: 36,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
  subHeader: {
    fontSize: 14,
    fontFamily: 'outfit-regular',
    color: '#666',
    marginTop: 5,
  },
  placeCard: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 18,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: 'center',
  },
  placeImage: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  placeInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  placeName: {
    fontSize: 16,
    fontFamily: 'outfit-semibold',
    color: '#333',
  },
  placeCategory: {
    fontSize: 13,
    fontFamily: 'outfit-medium',
    color: '#666',
    marginTop: 4,
  },
});
