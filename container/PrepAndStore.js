import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrepAndStore({ route }) {
  const { foodId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prep and Store Methods for {foodId}</Text>
      <Text style={styles.content}>Here you can add the methods to prepare and store the food.</Text>
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
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
  },
});
