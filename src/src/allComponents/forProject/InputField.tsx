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
import responsive from '../utils/responsive';
import { Colors, Fonts } from '../utils/colorsFonts';
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
  height: responsive.minHeight(13.7, 11),
  borderRadius: responsive.radius(2, 2),
  borderWidth: 1.39,
  paddingHorizontal: responsive.spacing(3, 2.5),

  fontSize: responsive.font(4.6, 3.6),
  labelSize: responsive.font(4.2, 3.4),
  errorSize: responsive.font(3.0, 2.0),
  marginBottom: responsive.spacing(3, 2.2),
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
    setIsFocused(false);
    const cleaned = value.trim().replace(/\s{2,}/g, ' ');
    onChangeText(cleaned);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const inputContainerHeight =
    customHeight ||
    (multiline ? responsive.minHeight(14, 11) : DIMENSIONS.height);

  const inputContainerStyle = {
    ...getInputContainerStyle(isFocused, !!value, !!error, disabled),
    height: inputContainerHeight,
    width: width === 'half' ? '48%' : '100%',
    flexDirection: 'row' as const,
    alignItems: multiline ? ('flex-start' as const) : ('center' as const),
    paddingVertical: multiline ? responsive.spacing(1.2, 0.8) : 0,
  };

  return (
    <View style={[commonStyles.container, containerStyle]}>
      <Text
        style={[
          commonStyles.label,
          disabled && {color: Colors.disabled},
          error && {color: Colors.error},
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
          placeholderTextColor={Colors.placeholder}
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
            style={commonStyles.iconContainer}>
            <Icon
              name="keyboard-arrow-down"
              size={isTabletPortrait ? 24 : 20}
              color={disabled ? Colors.disabled : Colors.default}
            />
          </TouchableOpacity>
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
    marginBottom: responsive.spacing(1.2, 0.8),
    fontWeight: '500',
  },
  input: {
    fontSize: DIMENSIONS.fontSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    paddingVertical: responsive.spacing(1, 0.8),
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: responsive.spacing(1, 0.6),
    marginLeft: responsive.spacing(1, 0.6),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  iconContainer: {
    padding: responsive.spacing(1, 0.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {InputField};
