import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define your device ID here
const DEVICE_ID = 'SM_N986NZNEKTC';

export default function AddFoodScreen({ route, navigation }) {
  const { mode } = route.params || {};
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [storageType, setStorageType] = useState('room');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (mode === 'takePhoto') {
      handleTakePhoto();
    } else if (mode === 'chooseFromGallery') {
      handleChooseFromGallery();
    }
  }, [mode]);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access camera was denied');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      console.log('Photo URI:', result.uri);
      // Handle the photo URI as needed
    }
    navigation.setParams({ mode: null }); // Reset mode
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access media library was denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      console.log('Gallery URI:', result.uri);
      // Handle the gallery URI as needed
    }
    navigation.setParams({ mode: null }); // Reset mode
  };

  const handleManualInput = async () => {
    // Validate inputs if necessary
    if (!foodName || !quantity || !expiryDate) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    // Map storageType to expected storageMethod
    const getStorageMethod = (type) => {
      switch (type) {
        case 'room':
          return 'ROOM_TEMPERATURE';
        case 'fridge':
          return 'REFRIGERATOR';
        case 'freezer':
          return 'FREEZER';
        default:
          return 'ROOM_TEMPERATURE';
      }
    };

    // Construct the food item data with deviceId
    const foodData = {
      deviceId: DEVICE_ID, // Include device ID here
      foodName,
      quantity: parseFloat(quantity),  // Convert quantity to a number
      expirationDate: expiryDate,
      storageMethod: getStorageMethod(storageType), // Correct storage method
      price: price ? parseFloat(price) : 0,  // Optional price, default to 0
    };

    console.log('Sending foodData:', foodData); // Log the payload

    try {
      // Make the API request to add the food item
      const response = await fetch('http://172.17.186.37:8080/api/fooditems/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData), // Send food data as a single JSON object
      });

      const responseData = await response.json(); // Parse the response

      if (response.ok) {
        console.log('Food item added:', responseData);
        Alert.alert('식품 추가 완료', '직접 입력이 완료되었습니다.');
        navigation.navigate('FoodList'); // Navigate back to the food list
      } else {
        console.error('Error response:', responseData);
        Alert.alert('오류', `식품 추가 중 문제가 발생했습니다: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      Alert.alert('오류', '서버에 연결할 수 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>식품 이름</Text>
      <TextInput
        style={styles.input}
        value={foodName}
        onChangeText={setFoodName}
        placeholder="식품 이름을 입력하세요."
      />
      <Text style={styles.label}>수량</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="수량을 입력하세요."
        keyboardType="numeric"
      />
      <Text style={styles.label}>유통기한</Text>
      <TextInput
        style={styles.input}
        value={expiryDate}
        onChangeText={setExpiryDate}
        placeholder="유통기한을 입력하세요. (YYYY-MM-DD)"
      />
      <Text style={styles.label}>가격</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="가격을 입력하세요."
        keyboardType="numeric"
      />
      <Text style={styles.label}>보관 유형</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={[styles.pickerButton, storageType === 'room' && styles.pickerButtonSelected]}
          onPress={() => setStorageType('room')}
        >
          <Text style={[styles.pickerButtonText, storageType === 'room' && styles.pickerButtonTextSelected]}>
            실온
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pickerButton, storageType === 'fridge' && styles.pickerButtonSelected]}
          onPress={() => setStorageType('fridge')}
        >
          <Text style={[styles.pickerButtonText, storageType === 'fridge' && styles.pickerButtonTextSelected]}>
            냉장
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pickerButton, storageType === 'freezer' && styles.pickerButtonSelected]}
          onPress={() => setStorageType('freezer')}
        >
          <Text style={[styles.pickerButtonText, storageType === 'freezer' && styles.pickerButtonTextSelected]}>
            냉동
          </Text>
        </TouchableOpacity>
      </View>

      {/* 추가하기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleManualInput}>
        <Text style={styles.addButtonText}>추가하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  pickerButtonSelected: {
    backgroundColor: '#667080',
  },
  pickerButtonText: {
    color: 'gray',
  },
  pickerButtonTextSelected: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#667080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
