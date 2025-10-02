import React, { useState } from 'react';
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
  UIManager,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';
import { Colors } from '../utils/colorsFonts';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window');
const isTablet = DeviceInfo.isTablet();
const isPortrait = height > width;
const isTabletPortrait = isTablet && isPortrait;

const DIMENSIONS = {
  height: isTabletPortrait ? rh(7) : rh(6.8),
  borderRadius: 12,
  borderWidth: 1,
  paddingHorizontal: rh(2),
  fontSize: rf(1.7),
  labelSize: rf(1.7),
  errorSize: rf(1.5),
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
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
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

interface InputFieldWithIconProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  allowedChars?: 'alphanumeric' | 'numeric' | 'letters' | 'all';
  autoCorrect?: boolean;
  editable?: boolean;
  width?: 'full' | 'half';
  customHeight?: number;
  iconEmpty: any;   // local image when input is empty
  iconFilled: any;  // local image when input has value
  iconPosition?: 'left' | 'right'; // control where icon shows
}

const InputFieldWithIcon: React.FC<InputFieldWithIconProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  onBlur,
  onFocus,
  disabled = false,
  error,
  containerStyle,
  inputStyle,
  maxLength,
  autoCapitalize = 'none',
  allowedChars = 'all',
  autoCorrect = false,
  editable = true,
  width = 'full',
  customHeight,
  iconEmpty,
  iconFilled,
  iconPosition = 'right',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    // setIsFocused(false);
    // const cleaned = value.trim().replace(/\s{2,}/g, ' ');
    // onChangeText(cleaned);
    // onBlur?.();
  };

  const handleFocus = () => {
    // setIsFocused(true);
    // onFocus?.();
  };

  const inputContainerHeight = customHeight || DIMENSIONS.height;
  const inputContainerStyle = {
    ...getInputContainerStyle(isFocused, !!value, !!error, disabled),
    height: inputContainerHeight,
    width: width === 'half' ? '48%' : '100%',
  };

  const iconSource = value ? iconFilled : iconEmpty;

const filterText = (text: string) => {
  switch (allowedChars) {
    case 'numeric':
      return text.replace(/[^0-9]/g, '');
    case 'letters':
      return text.replace(/[^a-zA-Z]/g, '');
    case 'alphanumeric':
      return text.replace(/[^a-zA-Z0-9]/g, '');
    default:
      return text;
  }
};

  return (
    <View style={[commonStyles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            commonStyles.label,
            disabled && { color: Colors.disabled },
            error && { color: Colors.error },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={inputContainerStyle}>
        {iconPosition === 'left' && (
          <Image
            source={iconSource}
            style={[
              commonStyles.icon,
              { tintColor: disabled ? Colors.disabled : Colors.icon },
            ]}
          />
        )}

        <TextInput
          style={[
            commonStyles.input,
            {
              flex: 1,
              color: disabled ? Colors.disabled : error ? Colors.error : Colors.text,
              paddingVertical: rh(0.5),
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          value={value}
          onChangeText={(text) => onChangeText(filterText(text))}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled && editable}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />

        {iconPosition === 'right' && (
          <Image
            source={iconSource}
            style={[
              commonStyles.icon,
              { tintColor: disabled ? Colors.disabled : Colors.icon },
            ]}
          />
        )}
      </View>

      {error && <Text style={commonStyles.errorText}>{error}</Text>}
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
  input: {
    fontSize: DIMENSIONS.fontSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    paddingVertical: rh(0.5),
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: rh(0.5),
    marginLeft: rh(0.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: rh(0.5),
  },
});

export { InputFieldWithIcon };
