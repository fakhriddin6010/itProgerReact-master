import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrepMethod({ route }) {
  const { foodId } = route.params;

  // 예제 데이터
  const foods = [
    { id: '1', name: '양파', prepMethod: '양파 손질 방법 설명' },
    { id: '2', name: '당근', prepMethod: '당근 손질 방법 설명' },
    { id: '3', name: '파프리카', prepMethod: '파프리카 손질 방법 설명' },
  ];

  const food = foods.find(f => f.id === foodId);

  if (!food) {
    return (
      <View style={styles.container}>
        <Text>손질 방법을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.name} 손질 방법</Text>
      <Text style={styles.content}>{food.prepMethod}</Text>
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
