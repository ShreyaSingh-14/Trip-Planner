import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FeaturedList({ data = [], onPressPlace }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPressPlace && onPressPlace(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {/* Overlay for discount */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>

      {/* Title at bottom of image */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={Colors.WHITE}
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={styles.header}>Featured ✨</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
    marginLeft: 15,
    marginBottom: 10,
  },
  card: {
    marginRight: 15,
    width: width * 0.7,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 12,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'outfit-semibold',
  },
  chevronIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
