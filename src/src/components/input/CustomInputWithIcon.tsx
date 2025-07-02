import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
} from 'react-native';

interface CustomInputWithIconProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isColumn?: boolean;
  inputContainerStyle?: object;
  iconEmpty: any; // require('...') image for empty input
  iconFilled: any; // require('...') image for filled input
  iconPosition?: 'left' | 'right';
  borderColor?: string;
  placeholderTextColor?: string;
}

const CustomInputWithIcon: React.FC<CustomInputWithIconProps> = ({
  label,
  value,
  onChangeText,
  isColumn = false,
  inputContainerStyle = {},
  iconEmpty,
  iconFilled,
  iconPosition = 'left',
  borderColor = '#e0e0e0',
  placeholderTextColor = '#888',
  ...restProps
}) => {
  const inputContainerCombinedStyle = [
    styles.inputContainer,
    { borderColor },
    inputContainerStyle,
  ];

  const iconSource = value?.trim() ? iconFilled : iconEmpty;

  const inputFieldWithIcon = (
    <View style={[styles.iconWrapper, iconPosition === 'right' && { flexDirection: 'row-reverse' }]}>
      <Image source={iconSource} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        {...restProps}
      />
    </View>
  );

  if (isColumn) {
    return (
      <View style={styles.containerColumn}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={inputContainerCombinedStyle}>{inputFieldWithIcon}</View>
      </View>
    );
  }

  return (
    <View style={styles.containerRow}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputContainerCombinedStyle}>{inputFieldWithIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '85%',
  },
  containerColumn: {
    marginVertical: 8,
    gap: 10,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  inputContainer: {
    borderWidth: 1.4,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    width: '100%',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
});

export default CustomInputWithIcon;



/*
************************************************

     const [email, setEmail] = useState('');

      <CustomInputWithIcon
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        isColumn={true}
        inputContainerStyle={{
          borderBottomWidth: 1.3,
          borderRadius: 0, 
          borderWidth: 0,
          // backgroundColor:'#fcfcfc',
        }}
        iconEmpty={require('../../assets/images/logo.png')}
        iconFilled={require('../../assets/images/grocery.png')}
        iconPosition="right"

      />

************************************************
*/