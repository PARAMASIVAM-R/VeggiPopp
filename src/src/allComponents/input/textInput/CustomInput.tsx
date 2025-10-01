import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
// import fonts from '../../../../assets/fonts';

interface CustomInputProps extends TextInputProps {
  label: string;
  borderColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  isColumn?: boolean;
  inputContainerStyle?: object; // ✅ new prop
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  borderColor = '#e0e0e0',
  value,
  onChangeText,
  placeholderTextColor="#888",
  isColumn = false,
  inputContainerStyle = {}, // default empty
  ...restProps
}) => {
  const inputContainerCombinedStyle = [
    styles.inputContainer,
    { borderColor },
    inputContainerStyle, // apply additional styles here
  ];

  if (isColumn) {
    return (
      <View style={styles.container2}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={inputContainerCombinedStyle}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            {...restProps}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputContainerCombinedStyle}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          {...restProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '85%',
  },
  container2: {
    marginVertical: 8,
    gap: 10,
    width: '100%',
    
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
    // fontFamily: fonts.regular,
  },
  inputContainer: {
    // flex: 1,
    borderWidth: 1.39,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    width:'100%'
  },
  title: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  input: {
    fontSize: 14,
    padding: 0,
    // fontFamily: fonts.regular,
  },
});

export default CustomInput;









/*
************************************************
  const [email, setEmail] = useState('');

 Row layout 
      <CustomInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

Column layout 
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        isColumn={true}
        borderColor="#783CE5"
      />

      
 <CustomInput
   label="Email"
   value={email}
   onChangeText={setEmail}
   placeholder="Enter email"
   borderColor="#e2e2e2"
   isColumn={true}
   inputContainerStyle={{
     borderBottomWidth: 1.3,
     borderRadius: 0, 
     borderWidth: 0,
     // backgroundColor:'#fcfcfc',
   }}



************************************************
*/