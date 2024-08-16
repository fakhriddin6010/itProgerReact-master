const foods = [
    { id: '1', name: '양파', expiry: '24-05-16', image: require('../assets/onion.png') },
    { id: '2', name: '당근', expiry: '24-05-12', image: require('../assets/carrot.png') },
    { id: '3', name: '파프리카', expiry: '24-05-10', image: require('../assets/pepper.png') },
  ];
  
  const food = foods.find(f => f.id === foodId);
  
  return (
    <View style={styles.foodInfoContainer}>
      <Image source={food.image} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodExpiry}>유통기한: {food.expiry}</Text>
      </View>
    </View>
  );
  