import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StoreMethod({ route }) {
  const { foodId } = route.params;

  // 예제 데이터
  const foods = [
    { id: '1', name: '양파', storeMethod: '양파 보관 방법 설명' },
    { id: '2', name: '당근', storeMethod: '당근 보관 방법 설명' },
    { id: '3', name: '파프리카', storeMethod: '파프리카 보관 방법 설명' },
  ];

  const food = foods.find(f => f.id === foodId);

  if (!food) {
    return (
      <View style={styles.container}>
        <Text>보관 방법을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.name} 보관 방법</Text>
      <Text style={styles.content}>{food.storeMethod}</Text>
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
  },
  content: {
    fontSize: 16,
  },
});
