import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  placeholderTextColor?: string;
  showIcon: ImageSourcePropType;
  hideIcon: ImageSourcePropType;
  isColumn?: boolean;
  inputContainerStyle?:object;
  borderColor?: string;
  selectionColor?:string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter Password',
  label,
  placeholderTextColor = '#888',
  showIcon,
  hideIcon,
  isColumn = false,
  borderColor = '#e0e0e0',
  selectionColor="black" ,
  inputContainerStyle ={},
  ...restProps
}) => {
  const inputContainerCombinedStyle = [
    styles.inputContainer,
    { borderColor },
    inputContainerStyle,
  ];

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={isColumn ? styles.containerColumn : styles.containerRow}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputContainerCombinedStyle}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!showPassword} // key: true means it hides as •••
          autoCapitalize="none"
          selectionColor={selectionColor} 
          {...restProps}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? showIcon : hideIcon} // eye if shown, eye-off if hidden
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '80%',
  },
  containerColumn: {
    flexDirection: 'column',
    gap: 10,
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.39,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color:'black',
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 8,
    tintColor: '#666',
  },
});


export default PasswordInput;



/*
************************************************

    const [password, setPassword] = useState('');

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showIcon={require('../../assets/images/logo.png')}
        hideIcon={require('../../assets/images/grocery.png')}
        placeholderTextColor="#888"
        selectionColor="#00BFFF" 
        inputContainerStyle={{
          borderBottomWidth: 1.3,
          borderRadius: 0, 
          borderWidth: 0,
          // backgroundColor:'#fcfcfc',
        }}
        
      />

************************************************
*/