import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function HeaderRightIcon({ navigation }) { 
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLoginPress = () => {
    setModalVisible(false);
    navigation.navigate('Login'); // LoginScreen ga navigatsiya
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
        <Image source={require('../assets/options.png')} style={styles.icon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleLoginPress}>
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { console.log("About pressed"); }}>
              <Text style={styles.modalButtonText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { console.log("Setting pressed"); }}>
              <Text style={styles.modalButtonText}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={toggleModal}>
              <Text style={[styles.modalButtonText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 20,
    paddingTop: 20,
  },
  icon: {
    width: 28,
    height: 26,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#b8bbd1', // Modal oynasining orqa foni
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#6A7CA6', // `#b8bbd1` rangiga mos keluvchi quyuqroq rang
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red', // Logout red 
  },
  logoutText: {
    color: 'white',
  },
});
