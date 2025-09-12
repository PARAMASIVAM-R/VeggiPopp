import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';


const { width, height } = Dimensions.get('window');
const isTablet = DeviceInfo.isTablet();
const isPortrait = height > width;
const isTabletPortrait = isTablet && isPortrait;

const COLORS = {

  default: '#C1C7CD',
  focused: '#4589FF',
  focusedBg: '#EDF5FF',
  disabled: '#86898cff',
  disabledBg: '#F9F9F9',
  errorBg: '#FFF1F1',
  error: '#FA4D56',
  text: '#151515',

  placeholder: 'rgba(0, 0, 0, 0.4)',
  white: '#FFFFFF',
  label: '#000000',
};

const DIMENSIONS = {
  height: isTabletPortrait ? rh(7) : rh(6.8), // Same height for all components
  borderRadius: 12,
  borderWidth: 1,
  paddingHorizontal: rh(2),
  fontSize: rf(1.7),
  labelSize: rf(1.7),
  errorSize: rf(1.5),
  marginBottom: rh(2),
};

interface RadioSelectProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  editable?: boolean;   // whether user can change value
  disabled?: boolean;   // fully disabled (grayed out)
  error?: string;       // error message to show
}

export const RadioSelect: React.FC<RadioSelectProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  editable = true,
  disabled = false,
  error = '',
}) => {
  return (
    <View style={[styles.container, disabled && { opacity: 0.5 }]}>
      {label && (
        <Text style={[styles.label, disabled && { color: COLORS.focused }]}>
          {label}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map(option => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                if (!disabled && editable) onChange(option);
              }}
              activeOpacity={0.7}
              disabled={disabled}
            >
              <View
                style={[
                  styles.circle,
                  isSelected && styles.circleSelected,
                  disabled && { borderColor: COLORS.disabled },
                  error && !isSelected && { borderColor: COLORS.error },
                ]}
              >
                {isSelected && (
                  <View
                    style={[
                      styles.innerCircle,
                      disabled && { backgroundColor: COLORS.disabled },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  disabled && { color: COLORS.disabled },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 6 },
  label: {
    fontSize: DIMENSIONS.labelSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: COLORS.label,
    marginBottom: rh(0.8),
    fontWeight: '600',
  },
  optionsContainer: {flexDirection: 'row', alignItems: 'center', gap: 20},
  option: {flexDirection: 'row', alignItems: 'center'},
  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.focused,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    borderColor: COLORS.focused,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.focused,
  },
  optionText: {
    fontSize: DIMENSIONS.labelSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: COLORS.label,
    marginLeft: 7,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: rh(0.5),
  },
});
