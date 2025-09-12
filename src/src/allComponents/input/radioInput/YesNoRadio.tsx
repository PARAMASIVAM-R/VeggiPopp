import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
// import {RadioButton} from 'react-native-paper';
import fonts from '../../assets/fonts';

interface YesNoRadioProps {
  value: 'yes' | 'no' | '';
  yesLabel?: string;
  noLabel?: string;
  containerStyle?: object;
  onValueChange: (value: 'yes' | 'no') => void;
  color?: string;
  disabled?: boolean;
}

const YesNoRadio: React.FC<YesNoRadioProps> = ({
  value,
  onValueChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  containerStyle,
  color = '#16B26A',
  disabled = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.radioGroup}>
        <View style={[styles.radioOption]}>
          {/* <RadioButton.Android
            value="yes"
            status={value === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => {
              if (!disabled) onValueChange('yes');
            }}
            color={color}
            // disabled={disabled}
            uncheckedColor="#D9D9D9"
          /> */}
          {/* <Pressable
            style={[styles.unselected, {borderColor: color}]} /> */}
          <Pressable
            onPress={() => {
              if (!disabled) {
                onValueChange('yes');
              }
            }}
            style={[styles.unselected, {borderColor: color}]}>
            {value === 'yes' && (
              <View style={[styles.selected, {backgroundColor: color}]} />
            )}
          </Pressable>
          <Text
            style={[styles.radioLabel]}
            onPress={() => onValueChange('yes')}
            disabled={disabled}>
            {yesLabel}
          </Text>
        </View>

        <View style={[styles.radioOption]}>
          {/* <RadioButton.Android
            value="no"
            status={value === 'no' ? 'checked' : 'unchecked'}
            onPress={() => {
              if (!disabled) onValueChange('no');
            }}
            color={color}
            // disabled={disabled}
            uncheckedColor="#D9D9D9"
          /> */}
          <Pressable
            onPress={() => {
              if (!disabled) {
                onValueChange('no');
              }
            }}
            style={[styles.unselected, {borderColor: color}]}>
            {value === 'no' && (
              <View style={[styles.selected, {backgroundColor: color}]} />
            )}
          </Pressable>
          <Text
            style={[styles.radioLabel]}
            onPress={() => onValueChange('no')}
            disabled={disabled}>
            {noLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    color: '#000',
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: '500',
    marginLeft: 5,
  },
  unselected: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    height: 24,
    width: 24,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
});

export default YesNoRadio;
