import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from 'react-native-responsive-dimensions';
import { Fonts } from '../../utils/colorsFonts';


const UnitToggleButtons = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option && styles.selectedButton,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.text,
              selected === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    // borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#007AFF',
    fontSize: rh(2),
     fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
  selectedText: {
    color: '#fff',
     fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
});

export default UnitToggleButtons;
