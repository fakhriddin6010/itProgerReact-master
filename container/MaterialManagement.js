import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MaterialManagementScreen({ navigation }) {
  const handleVideoPress = () => {
    console.log('Video ochilmoqda');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>재료 관리 방법</Text>
      <View style={styles.card}>
        <Text style={styles.managementText}>
          양파를 신선하게 오랫동안 보관하는 방법은 다음과 같습니다.{"\n"}
          {"\n"}1. 서늘하고 건조한 곳에 보관{"\n"}
          양파는 서늘하고 건조한 곳에서 보관해야 오랫동안 신선도를 유지할 수 있습니다.{"\n"}
          {"\n"}2. 통풍이 잘되는 곳에 보관{"\n"}
          양파는 통풍이 잘되는 망에 넣어 보관하는 것이 좋습니다.{"\n"}
          {"\n"}3. 냉장 보관하지 않기{"\n"}
          양파는 냉장 보관 시 습기로 인해 쉽게 상할 수 있으므로, 실온 보관을 추천합니다.{"\n"}
          {"\n"}4. 썩은 양파는 제거{"\n"}
          썩은 양파는 다른 양파에게 악영향을 미칠 수 있으니, 발견 즉시 제거하세요.
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.button} onPress={handleVideoPress}>
        <Text style={styles.buttonText}>영상 보기</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  managementText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
