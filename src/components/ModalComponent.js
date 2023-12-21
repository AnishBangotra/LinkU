import React from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const ModalComponent = ({ showModal, child, setModal }) => {
  function action() {
    child();
    setModal(!showModal)
  }

  function ConfirmPopup() {
    const description = 'Are you sure, you want to unlink this chat?';
    return (
      <View style={{
        width: '60%',
        height: 'auto',
        padding: '15px',
        borderRadius: 14,
        backgroundColor: 'white',
      }}>
        <Text
          style={{
           marginVertical: 25,
           marginHorizontal: 20,
           letterSpacing: 1,
           fontSize: 16, 
          }}
        >{description}</Text>
        <View style={{
          // width: '100%',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <TouchableOpacity 
          style={{
              padding: '5px'
            }}
          onPress={() => setModal(!showModal)}
            >
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                fontSize: 15,
                letterSpacing: 1,
              }}
            >No</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => action()}  
          >
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 15,
                letterSpacing: 1,
              }}
            >Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return(
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setModal(!showModal);
        console.log('Modal has been closed.');
      }}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback
            // onPress={() => {
            //   setModal(!showModal);
            // }}
            > 
            <View style={styles.backDrop} />
          </TouchableWithoutFeedback>
          {ConfirmPopup()}
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: '100%',
    width: '100%',
    borderColor: '#fff',
    zIndex: 300,
  },
  backDrop: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

export default ModalComponent;
