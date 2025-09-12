import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import responsive from '../utils/responsive';
import { Colors, Fonts } from '../utils/colorsFonts';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DIMENSIONS = {
  height: rh(6.8),
  borderRadius: rw(3),
  borderWidth: 1,
  paddingHorizontal: rw(4),
  fontSize: rf(1.7),
  labelSize: rf(1.7),
  errorSize: rf(1.5),
  marginBottom: rh(2),
};

const getInputContainerStyle = (
  isFocused: boolean,
  hasValue: boolean,
  hasError: boolean,
  disabled: boolean
) => {
  const baseStyle = {
    height: DIMENSIONS.height,
    borderRadius: DIMENSIONS.borderRadius,
    borderWidth: DIMENSIONS.borderWidth,
    paddingHorizontal: DIMENSIONS.paddingHorizontal,
    justifyContent: 'center' as const,
  };

  if (disabled) {
    return {
      ...baseStyle,
      borderColor: Colors.disabled,
      backgroundColor: Colors.disabledBg,
      opacity: 0.6,
    };
  }

  if (hasError) {
    return {
      ...baseStyle,
      borderColor: Colors.error,
      backgroundColor: Colors.errorBg,
    };
  }

  if (isFocused) {
    return {
      ...baseStyle,
      borderColor: Colors.focused,
      backgroundColor: Colors.focusedBg,
      shadowColor: Colors.focused,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    };
  }

  return {
    ...baseStyle,
    borderColor: Colors.default,
    backgroundColor: Colors.white,
  };
};

interface InputFieldWithUnitsProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  editable?: boolean;
  keyboardType?: any;
  unit?: string;
  showUnitButtons?: boolean;
  unitButtons?: string[];
  selectedUnitButton?: string;
  onUnitButtonPress?: (unit: string) => void;
  showDropdown?: boolean;
  dropdownOptions?: string[];
  selectedOption?: string;
  onOptionSelect?: (option: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  widthType?: 'full' | 'half' | 'custom';
}

const InputFieldWithUnits: React.FC<InputFieldWithUnitsProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter value',
  label,
  required = false,
  errorMessage,
  editable = true,
  keyboardType = 'default',
  unit,
  showUnitButtons = false,
  unitButtons = [],
  selectedUnitButton,
  onUnitButtonPress,
  showDropdown = false,
  dropdownOptions = [],
  selectedOption,
  onOptionSelect,
  containerStyle,
  inputStyle,
  labelStyle,
  widthType = 'full',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const handleUnitButtonPress = (unitValue: string) => {
    onUnitButtonPress?.(unitValue);
    inputRef.current?.focus();
  };

  const toggleDropdown = () => {
    const toValue = isDropdownOpen ? 0 : 1;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect?.(option);
    setIsDropdownOpen(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const inputContainerStyle = {
    ...getInputContainerStyle(isFocused, !!value, !!errorMessage, !editable),
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };

  const widthStyle: ViewStyle = (() => {
    switch (widthType) {
      case 'half':
        return { width: rw(43) };
      case 'custom':
        return {};
      case 'full':
      default:
        return { width: '100%' };
    }
  })();

  const arrowRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[commonStyles.container, widthStyle, containerStyle]}>
      {label && (
        <View style={commonStyles.labelContainer}>
          <Text
            style={[
              commonStyles.label,
              !editable && { color: Colors.disabled },
              errorMessage && { color: Colors.error },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {required && <Text style={commonStyles.requiredStar}>*</Text>}
        </View>
      )}

      <View style={inputContainerStyle}>
        <TextInput
          ref={inputRef}
          style={[
            commonStyles.input,
            {
              flex: 1,
              color: !editable ? Colors.disabled : errorMessage ? Colors.error : Colors.text,
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {unit && (
          <Text
            style={[
              commonStyles.unitLabel,
              !editable && { color: Colors.disabled },
              errorMessage && { color: Colors.error },
            ]}
          >
            {unit}
          </Text>
        )}

        {showDropdown && (
          <TouchableOpacity
            style={commonStyles.dropdownButton}
            onPress={toggleDropdown}
            disabled={!editable}
          >
            <Text
              style={[
                commonStyles.dropdownButtonText,
                { color: !editable ? Colors.disabled : Colors.focused },
              ]}
            >
              {selectedOption || dropdownOptions[0] || 'Select'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <Text style={commonStyles.errorText}>{errorMessage}</Text>}

      {showUnitButtons && unitButtons.length > 0 && (
        <View style={commonStyles.unitButtonsContainer}>
          {unitButtons.map((unitValue, index) => {
            const isSelected = selectedUnitButton === unitValue;
            const isFirst = index === 0;
            const isLast = index === unitButtons.length - 1;

            return (
              <TouchableOpacity
                key={unitValue}
                style={[
                  commonStyles.unitButton,
                  isSelected && commonStyles.selectedUnitButton,
                  isFirst && commonStyles.firstUnitButton,
                  isLast && commonStyles.lastUnitButton,
                  !editable && commonStyles.unitButtonDisabled,
                ]}
                onPress={() => handleUnitButtonPress(unitValue)}
                disabled={!editable}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    commonStyles.unitButtonText,
                    isSelected && commonStyles.selectedUnitButtonText,
                    !editable && commonStyles.unitButtonTextDisabled,
                  ]}
                >
                  {unitValue}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {showDropdown && isDropdownOpen && (
        <View style={commonStyles.dropdownContainer}>
          {dropdownOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.dropdownOption,
                selectedOption === option && commonStyles.selectedOption,
                index === dropdownOptions.length - 1 && commonStyles.lastOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  commonStyles.dropdownOptionText,
                  selectedOption === option && commonStyles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.marginBottom,
  },
  label: {
    fontSize: DIMENSIONS.labelSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: Colors.label,
    marginBottom: rh(0.8),
    fontWeight: '500',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: rh(0.8),
    alignItems: 'center',
  },
  requiredStar: {
    fontSize: DIMENSIONS.labelSize,
    color: Colors.error,
    marginLeft: rw(0.5),
  },
  input: {
    fontSize: DIMENSIONS.fontSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    paddingVertical: rh(0.5),
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: rh(0.5),
    marginLeft: rw(1.2),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.5),
    marginLeft: rw(2),
  },
  dropdownButtonText: {
    fontSize: rf(1.4),
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderRadius: rw(1.5),
    borderColor: Colors.default,
    marginTop: rh(0.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: rh(25),
    width: rw(30),
    alignSelf: 'flex-end',
    position: 'relative',
  },
  dropdownOption: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  selectedOption: {
    backgroundColor: Colors.focusedBg,
  },
  dropdownOptionText: {
    fontSize: rf(1.4),
    color: Colors.text,
  },
  selectedOptionText: {
    color: Colors.focused,
    fontWeight: '600',
  },
  unitLabel: {
    fontSize: DIMENSIONS.fontSize,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: rw(3),
  },
  unitButtonsContainer: {
    flexDirection: 'row',
    marginTop: rh(1.5),
    borderRadius: rw(2),
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  unitButton: {
    paddingHorizontal: rw(6),
    paddingVertical: rh(1.5),
    backgroundColor: '#F3F4F6',
    borderRightWidth: 0,
  },
  firstUnitButton: {
    borderTopLeftRadius: rw(2),
    borderBottomLeftRadius: rw(2),
  },
  lastUnitButton: {
    borderRightWidth: 1,
    borderTopRightRadius: rw(2),
    borderBottomRightRadius: rw(2),
  },
  selectedUnitButton: {
    backgroundColor: Colors.focused,
    borderColor: Colors.focused,
  },
  unitButtonDisabled: {
    backgroundColor: Colors.disabledBg,
    borderColor: Colors.disabled,
  },
  unitButtonText: {
    fontSize: rf(1.4),
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedUnitButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  unitButtonTextDisabled: {
    color: Colors.disabled,
  },
});

export { InputFieldWithUnits };
