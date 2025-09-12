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
import DatePicker from 'react-native-date-picker';
import {
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';
import responsive from '../utils/responsive';
import { Colors } from '../utils/colorsFonts';

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

// ====== DIMENSIONS (using your responsive.js) ======
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

interface DateInputFieldProps {
  label: string;
  value: Date | null;
  placeholder?: string;
  onDateChange: (date: Date) => void;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  width?: 'full' | 'half';
  containerStyle?: any;
  showInfoIcon?: boolean;
  onInfoPress?: () => void;
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  value,
  placeholder = 'Select Date',
  onDateChange,
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  width: widthProp = 'full',
  containerStyle,
  showInfoIcon = false,
  onInfoPress,
}) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';

    if (mode === 'date') {
      return `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
    } else if (mode === 'time') {
      return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    } else {
      return date.toLocaleString();
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setIsFocused(true);
      setOpen(true);
    }
  };

  // ...existing code...
  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setIsFocused(false);
    onDateChange(selectedDate); // Always update with selected date
  };
  // ...existing code...
  const handleCancel = () => {
    setOpen(false);
    setIsFocused(false);
  };

  const inputStyle = getInputContainerStyle(
    isFocused,
    !!value,
    !!error,
    disabled,
  );

  return (
    <View style={[commonStyles.container, containerStyle]}>
      <View style={commonStyles.labelContainer}>
        <Text
          style={[
            commonStyles.label,
            disabled && {color: Colors.disabled},
            error && {color: Colors.error},
          ]}>
          {label}
        </Text>
        {showInfoIcon && (
          <TouchableOpacity
            onPress={onInfoPress}
            style={commonStyles.infoButton}>
            <Image
              source={require('../../assets/info.png')}
              resizeMode="contain"
              style={commonStyles.infoIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity onPress={handlePress} disabled={disabled}>
        <View
          style={[
            inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              width: widthProp === 'half' ? '48%' : '100%',
            },
          ]}>
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
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholder}
            value={formatDate(value)}
            editable={false}
            pointerEvents="none"
          />

          <Image
            source={
              value
                ? require('../../assets/Active_Calendar.png')
                : require('../../assets/Inactive_Calendar.png')
            }
            style={commonStyles.calendarIcon}
          />
        </View>
      </TouchableOpacity>

      {error && <Text style={commonStyles.errorText}>{error}</Text>}

      <DatePicker
        modal
        open={open}
        date={value || minimumDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        theme="light"
      />
    </View>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.marginBottom,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: responsive.spacing(1.5, 1.2),
    alignItems: 'center',
  },
  label: {
    fontSize: DIMENSIONS.labelSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: Colors.label,
    fontWeight: '600',
  },
  input: {
    fontSize: DIMENSIONS.fontSize,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    paddingVertical: responsive.spacing(1.2, 1),
  },
  errorText: {
    color: Colors.error,
    fontSize: DIMENSIONS.errorSize,
    marginTop: responsive.spacing(1, 0.8),
    marginLeft: responsive.spacing(1, 0.8),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  infoButton: {
    marginLeft: responsive.spacing(1.5, 1.2),
  },
  infoIcon: {
    width: responsive.size(3.5, 2.5),
    height: responsive.size(3.5, 2.5),
  },
  calendarIcon: {
    width: responsive.size(5, 4),
    height: responsive.size(5, 4),
  },
});

export {DateInputField};
