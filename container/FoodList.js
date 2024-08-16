import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FoodList({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const foods = [
    { id: '1', name: '양파', storage: 'room', expiry: '24-07-29', image: require('../assets/onion.png') },
    { id: '2', name: '당근', storage: 'fridge', expiry: '24-08-12', image: require('../assets/carrot1.png') },
    { id: '3', name: '파프리카', storage: 'freezer', expiry: '24-07-29', image: require('../assets/pepper.png') },
    { id: '4', name: '청양고추', storage: 'fridge', expiry: '24-07-29', image: require('../assets/chilli.png') },
  ];

  const filteredFoods = foods.filter(food => filter === 'all' || food.storage === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>조회</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../assets/options.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filterButtons}>
        <TouchableOpacity onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.selected]}>
          <Text style={styles.filterButtonText}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('fridge')} style={[styles.filterButton, filter === 'fridge' && styles.selected]}>
          <Text style={styles.filterButtonText}>냉장</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('freezer')} style={[styles.filterButton, filter === 'freezer' && styles.selected]}>
          <Text style={styles.filterButtonText}>냉동</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('room')} style={[styles.filterButton, filter === 'room' && styles.selected]}>
          <Text style={styles.filterButtonText}>실온</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredFoods}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FoodDetail', { foodId: item.id })}>
            <View style={styles.foodItem}>
              <Image source={item.image} style={styles.foodImage} />
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodExpiry}>유통기한: {item.expiry}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.foodList}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ReceiptInput')} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 28,
    height: 27,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  selected: {
    backgroundColor: '#0a84ff',
  },
  filterButtonText: {
    color: '#fff',
  },
  foodList: {
    marginBottom: 80,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  foodImage: {
    width: 54,
    height: 56,
    marginRight: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodExpiry: {
    fontSize: 12,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
