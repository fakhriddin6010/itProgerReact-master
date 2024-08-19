import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';

export default function HeaderRightIcon() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{ paddingRight: 20, paddingTop:20 }}>
        <Image source={require('../assets/options.png')} style={{ width: 28, height: 26 }} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Options</Text>
            <TouchableOpacity onPress={() => { console.log("Login pressed"); }}>
              <Text style={{ marginVertical: 10 }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { console.log("About pressed"); }}>
              <Text style={{ marginVertical: 10 }}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{ color: 'red', marginVertical: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
