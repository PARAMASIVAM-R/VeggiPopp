import { Alert } from 'react-native';

export const showToast = (message) => {
  Alert.alert('Notice', message);
};
