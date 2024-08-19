import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';

export default function RecipeRecommendationScreen({ navigation }) {
  const handlePress = (type) => {
    navigation.navigate('RecommendedList', { type });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.card} onPress={() => handlePress('인기 레시피')}>
        <Image source={require('../assets/thumbs_up.png')} style={styles.icon} />
        <Text style={styles.cardText}>인기 레시피</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handlePress('오늘의 레시피')}>
        <Image source={require('../assets/sun.png')} style={styles.icon} />
        <Text style={styles.cardText}>오늘의 레시피</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handlePress('내 식재료로 추천 레시피')}>
        <Image source={require('../assets/fridge.png')} style={styles.icon} />
        <Text style={styles.cardText}>내 식재료로 추천 레시피</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
