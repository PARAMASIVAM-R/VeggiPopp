import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle,
  UIManager,
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';
import { Colors } from '../utils/colorsFonts';
import responsive from '../utils/responsive';


// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const {width, height} = Dimensions.get('window');
const isTablet = DeviceInfo.isTablet();
const isPortrait = height > width;
const isTabletPortrait = isTablet && isPortrait;

const DIMENSIONS = {
  height: isTabletPortrait ? rh(7) : rh(6.8), // Same height for all components
  borderRadius: 12,
  borderWidth: 1,
  paddingHorizontal: rh(2),
  fontSize: isTabletPortrait ? rf(1.1): rf(1.6),
  labelSize: isTabletPortrait ? rf(1.3): rf(1.7),
  errorSize:isTabletPortrait ? rf(0.9): rf(1.4),
  marginBottom: rh(2),
};

// ========== COMMON STYLE FUNCTION ==========
const getInputContainerStyle = (
  isFocused: boolean,
  hasValue: boolean,
  hasError: boolean,
  disabled: boolean,
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
      shadowOffset: {width: 0, height: 0},
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

interface InputFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  showDropdownIcon?: boolean;
  onDropdownPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  width?: 'full' | 'half';
  customHeight?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  onBlur,
  onFocus,
  disabled = false,
  error,
  showDropdownIcon = false,
  onDropdownPress,
  containerStyle,
  inputStyle,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  editable = true,
  secureTextEntry = false,
  width = 'full',
  customHeight,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    // setIsFocused(false);
    // onBlur?.();
  };

  const handleFocus = () => {
    // setIsFocused(true);
    // onFocus?.();
  };

  const inputContainerHeight =
    customHeight || (multiline ? rh(12) : DIMENSIONS.height);
  const inputContainerStyle = {
    ...getInputContainerStyle(isFocused, !!value, !!error, disabled),
    height: inputContainerHeight,
    width: width === 'half' ? '48%' : '100%',
    flexDirection: 'row' as const,
    alignItems: multiline ? ('flex-start' as const) : ('center' as const),
    paddingVertical: multiline ? rh(1) : 0,
  };

  return (
    <View style={[commonStyles.container, containerStyle]}>
      <Text
        style={[
          commonStyles.label,
          disabled && {color: Colors.disabled},
          // CHANGED: Make label red when there's an error
          error && {color: Colors.text},
        ]}>
        {label}
      </Text>

      <View style={inputContainerStyle}>
        <TextInput
          style={[
            commonStyles.input,
            {
              flex: 1,
              color: disabled
                ? Colors.disabled
                : error
                ? Colors.error
                : Colors.text,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingVertical: multiline ? rh(1) : rh(0.5),
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            disabled
              ? Colors.disabled
              : error
              ? Colors.error
              : Colors.placeholder
          }
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled && editable}
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
        />

{showDropdownIcon && (
  <TouchableOpacity
    onPress={onDropdownPress}
    disabled={disabled}
    style={commonStyles.iconContainer}
  >
    <Icon
      name="keyboard-arrow-down"
      size={isTabletPortrait ? 24 : 20}
      color={disabled ? Colors.disabled : Colors.default}
    />
  </TouchableOpacity>
)}
      </View>

      <View style={{minHeight: DIMENSIONS.errorSize * 1.9}}>
        {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    // marginBottom: DIMENSIONS.marginBottom,
    marginBottom:responsive.spacing(0,0)
  },
  label: {
    fontSize: DIMENSIONS.labelSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: Colors.label,
    marginBottom: rh(0.8),
    fontWeight: '500',
  },
  input: {
    fontSize: DIMENSIONS.fontSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    paddingVertical: rh(0.9),
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: rh(0.5),
    marginLeft: rh(0.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  iconContainer: {
    padding: rh(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {InputField};