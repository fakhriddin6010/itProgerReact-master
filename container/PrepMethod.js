import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, Picker, FlatList } from 'react-native';

export default function StorageMethod() {
  const DEVICE_ID = 'SM_N986NZNEKTC'; // Replace with dynamic device ID if needed

  const [storageMethod, setStorageMethod] = useState('REFRIGERATOR');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodItems(storageMethod);
  }, [storageMethod]);

  const fetchFoodItems = async (method) => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.17.186.37:8080/api/fooditems/${DEVICE_ID}/storage/${method}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json(); // Assuming the response is JSON
        setFoodItems(result);
      } else {
        Alert.alert('오류', '식품 목록을 가져오는 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('오류', '서버에 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      {/* Add more item details if available */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보관 방법 별 식품 목록</Text>
      <Picker
        selectedValue={storageMethod}
        style={styles.picker}
        onValueChange={(itemValue) => setStorageMethod(itemValue)}
      >
        <Picker.Item label="냉장고 (REFRIGERATOR)" value="REFRIGERATOR" />
        <Picker.Item label="냉동고 (FREEZER)" value="FREEZER" />
        <Picker.Item label="실온 (ROOM_TEMPERATURE)" value="ROOM_TEMPERATURE" />
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : foodItems.length > 0 ? (
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noDataText}>해당 보관 방법에 대한 식품이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
