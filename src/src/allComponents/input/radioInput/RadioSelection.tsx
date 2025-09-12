import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import fonts from '../../assets/fonts';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioSelectionProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

const RadioSelection: React.FC<RadioSelectionProps> = ({
  options,
  selectedValue,
  onValueChange,
  disabled = false,
  label,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.contain}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionContainer}
            onPress={() => !disabled && onValueChange(option.value)}
            activeOpacity={disabled ? 1 : 0.6}>
            <RadioButton.Android
              value={option.value}
              status={selectedValue === option.value ? 'checked' : 'unchecked'}
              onPress={() => !disabled && onValueChange(option.value)}
              disabled={disabled}
              color="#7B3F9D" // Purple color similar to the image
              uncheckedColor="#CCCCCC" // Light gray for unchecked
            />
            <Text
              style={[
                styles.title,
                selectedValue === option.value && styles.selectedLabel,
                disabled && styles.disabledText,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    fontWeight: '500',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  title: {
    fontSize: 16,
    marginLeft: 0,
    fontWeight: '500',
    color: '#151515',
    fontFamily: fonts.regular,
  },
  selectedLabel: {
    fontWeight: '500',
  },
  disabledText: {
    color: '#999999',
  },
  exampleContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default RadioSelection;
