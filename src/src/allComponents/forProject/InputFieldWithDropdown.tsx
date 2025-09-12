import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ViewStyle,
  TextStyle,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

// ========== COMMON STYLE FUNCTION ==========
const getInputContainerStyle = (isFocused: boolean, hasValue: boolean, hasError: boolean, disabled: boolean) => {
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

interface InputFieldWithDropdownProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  editable?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  showDropdown?: boolean;
  dropdownOptions?: string[];
  selectedOption?: string;
  onOptionSelect?: (option: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const InputFieldWithDropdown: React.FC<InputFieldWithDropdownProps> = ({
  value,
  onChangeText,
  placeholder = "Placeholder",
  label,
  required = false,
  errorMessage,
  editable = true,
  keyboardType = 'default',
  showDropdown = false,
  dropdownOptions = [],
  selectedOption,
  onOptionSelect,
  containerStyle,
  inputStyle,
  labelStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

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
    if (onOptionSelect) {
      onOptionSelect(option);
    }
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

  const arrowRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[commonStyles.container, containerStyle]}>
      {label && (
        <View style={commonStyles.labelContainer}>
          <Text style={[
            commonStyles.label,
            !editable && { color: Colors.disabled },
            errorMessage && { color: Colors.error },
            labelStyle
          ]}>
            {label}
          </Text>
          {required && <Text style={commonStyles.requiredStar}>*</Text>}
        </View>
      )}
      
      <View style={inputContainerStyle}>
        <TextInput
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
        
        {showDropdown && (
          <TouchableOpacity
            style={commonStyles.dropdownButton}
            onPress={toggleDropdown}
            disabled={!editable}
          >
            <Text style={[
              commonStyles.dropdownButtonText,
              { color: !editable ? Colors.disabled : Colors.focused }
            ]}>
              {selectedOption || dropdownOptions[0] || 'Select'}
            </Text>
            <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
              <Image source={require('../../assets/DropDownBlue.png')} style={commonStyles.dropdown} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
      
      {showDropdown && isDropdownOpen && (
        <View style={commonStyles.dropdownContainer}>
          {dropdownOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.dropdownOption,
                selectedOption === option && commonStyles.selectedOption,
                index === dropdownOptions.length - 1 && commonStyles.lastOption
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={[
                commonStyles.dropdownOptionText,
                selectedOption === option && commonStyles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {errorMessage && (
        <Text style={commonStyles.errorText}>{errorMessage}</Text>
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
  dropdown: {
    width: rw(6),
    height: rw(6),
    resizeMode: 'contain',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(0.5),
    marginLeft: rw(5),
  },
  dropdownButtonText: {
    fontSize: rf(1.4),
    fontWeight: '500',
    marginRight: rw(1.5),
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderRadius: rw(1.5),
    borderWidth: 1,
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
});

export {
  InputFieldWithDropdown
};