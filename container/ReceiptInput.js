import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReceiptInput({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>식품 추가 </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddFood', { mode: 'takePhoto' })}
      >
        <Text style={styles.buttonText}>TAKE PHOTO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddFood', { mode: 'chooseFromGallery' })}
      >
        <Text style={styles.buttonText}>CHOOSE FROM GALLERY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddFood', { mode: 'manualInput' })}
      >
        <Text style={styles.buttonText}>직접 입력</Text>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0a84ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
