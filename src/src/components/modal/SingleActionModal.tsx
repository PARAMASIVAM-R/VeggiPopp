import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';

interface SingleActionModalProps {
  visible: boolean;
  onClose: () => void;
  image: ImageSourcePropType;
  header: string;
  description: string;
  buttonLabel: string;
  onButtonPress: () => void;
  modalStyle?: ViewStyle;
  headerStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

const SingleActionModal: React.FC<SingleActionModalProps> = ({
  visible,
  onClose,
  image,
  header,
  description,
  buttonLabel,
  onButtonPress,
  modalStyle,
  headerStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, modalStyle]}>
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={[styles.header, headerStyle]}>{header}</Text>
          <Text style={[styles.description, descriptionStyle]}>{description}</Text>
          <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onButtonPress}>
            <Text style={[styles.buttonText, buttonTextStyle]}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SingleActionModal;



/*
************************************************

<CustomModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  image={require('../assets/success.png')}
  header="Success!"
  description="Your registration was successful."
  buttonLabel="OK"
  onButtonPress={() => {
    setShowModal(false);
    // any other action
  }}
/>

************************************************
*/