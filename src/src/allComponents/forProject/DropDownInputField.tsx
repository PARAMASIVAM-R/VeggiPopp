import React, {useState, useRef} from 'react';
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
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
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
  height: responsive.size(13, 11),
  borderRadius: responsive.radius(2, 2),
  borderWidth: responsive.radius(0.3, 0.16),
  paddingHorizontal: responsive.spacing(4.4, 3.6),

  fontSize: responsive.font(4.6, 3.6), // selected text
  labelSize: responsive.font(4.2, 3.4), // label
  placeholderSize: responsive.font(4.2, 3.4),
  errorSize: responsive.font(4.0, 3.2),
  marginBottom: responsive.spacing(2, 2),
};

// Focus/disabled/error styling
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

    justifyContent: 'center',
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

interface DropDownInputFieldProps {
  label: string;
  data: {label: string; value: string}[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  showSearch?: boolean;
  containerStyle?: ViewStyle;
  width?: string | number;
  forceFullWidth?: boolean;
}

const DropDownInputField: React.FC<DropDownInputFieldProps> = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select',
  error,
  disabled = false,
  showSearch = false,
  containerStyle,
  width = '100%',
  forceFullWidth = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const dropdownStyle = getInputContainerStyle(
    isFocused,
    !!value,
    !!error,
    disabled,
  );
  const dropdownWidth = forceFullWidth ? '100%' : width;

  return (
    <View
      style={[
        styles.container,
        forceFullWidth && styles.fullWidthContainer,
        containerStyle,
      ]}>
      <Text
        style={[
          styles.label,
          disabled && {color: Colors.disabled},
          error && {color: Colors.error},
        ]}>
        {label}
      </Text>

      <Dropdown
        style={[dropdownStyle]}
        placeholderStyle={[
          styles.placeholderStyle,
          disabled && {color: Colors.disabled},
          error && {color: Colors.error},
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          disabled && {color: Colors.disabled},
          error && {color: Colors.error},
        ]}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle} // 👈 ADD THIS
        data={data}
        search={showSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => onChange(item.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disable={disabled}
        renderLeftIcon={() => null}
        iconStyle={{
          // ~24px on phone (6.7%)
          ...responsive.iconSize(6.7, 5.2),
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.marginBottom,
  },
  fullWidthContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: responsive.spacing(4.4, 3.6),
  },
  label: {
    fontSize: DIMENSIONS.labelSize,
    lineHeight: responsive.lineHeight(5.2, 4.2), // keep readable
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
    color: Colors.label,
    marginBottom: responsive.spacing(2.0, 1.6),
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: DIMENSIONS.placeholderSize,
    lineHeight: responsive.lineHeight(5.9, 4.0),
    color: Colors.placeholder,
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
  selectedTextStyle: {
    fontSize: DIMENSIONS.fontSize,
    lineHeight: responsive.lineHeight(5.4, 4.4),
    color: Colors.text,
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
    fontWeight: '400',
  },
  inputSearchStyle: {
    height: responsive.size(12.5, 10),
    fontSize: DIMENSIONS.placeholderSize,
    lineHeight: responsive.lineHeight(5.0, 4.0),
    color: Colors.text,
    borderRadius: responsive.radius(3.0, 2.4),
    paddingHorizontal: responsive.spacing(3.6, 3.0),
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    lineHeight: responsive.lineHeight(4.8, 3.8),
    marginTop: responsive.spacing(2.0, 1.6),
    marginLeft: responsive.spacing(2.0, 1.6),
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
  itemTextStyle: {
    fontSize: responsive.font(3.5, 3), // 🔹 increase size
    lineHeight: responsive.lineHeight(6.0, 4.8),
    color: Colors.text,
    fontFamily: Platform.OS === 'android' ? Fonts.regular : 'System',
  },
});

export {DropDownInputField};
