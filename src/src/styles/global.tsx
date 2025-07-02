// src/styles/global.js
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  textNormal: {
    fontSize: 16,
    color: colors.black,
  },
  errorText: {
    fontSize: 14,
    color: colors.danger,
  },
});
