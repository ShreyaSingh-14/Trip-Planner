import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

// Hardcoded categories with emojis
const categoryList = [
  { name: 'All', emoji: '🌍' },
  { name: 'Beach', emoji: '🏖️' },
  { name: 'Mountain', emoji: '⛰️' },
  { name: 'Valley', emoji: '🏞️' },
  { name: 'City', emoji: '🏙️' },
  { name: 'Forest', emoji: '🌲' },
  { name: 'Desert', emoji: '🏜️' },
  { name: 'Lake', emoji: '🏞️' },
  { name: 'Island', emoji: '🏝️' },
  { name: 'River', emoji: '🌊' },
  { name: 'Snow', emoji: '❄️' },
  { name: 'Historic', emoji: '🏛️' },
];

export default function CategoryList({ selectedCategory: propSelected, onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  // If parent passes selectedCategory, use it
  useEffect(() => {
    if (propSelected) {
      setSelectedCategory(propSelected);
    }
  }, [propSelected]);

  const handleSelect = (category) => {
    const newSelection = selectedCategory === category ? 'All' : category;
    setSelectedCategory(newSelection);
    onSelectCategory && onSelectCategory(newSelection); // Notify parent

    // Navigate to ExploreDetails page and pass the category
    // router.push({
    //   pathname: '/explore-details',
    //   params: { category: newSelection },
    // });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.name && styles.categoryChipSelected,
      ]}
      onPress={() => handleSelect(item.name)}
    >
      <Text
        style={[
          styles.emoji,
          selectedCategory === item.name && { fontSize: 32 },
        ]}
      >
        {item.emoji}
      </Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && { color: Colors.WHITE },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categoryList}
      renderItem={renderCategory}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, idx) => idx.toString()}
      contentContainerStyle={{ paddingLeft: 10, paddingVertical: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  categoryChip: {
    width: 70,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryChipSelected: {
    backgroundColor: Colors.PRIMARY,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 5,
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
});
