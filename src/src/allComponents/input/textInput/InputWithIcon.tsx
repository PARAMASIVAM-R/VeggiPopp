import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from 'react-native';
// import fonts from '../../../../assets/fonts';

interface InputWithIconProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconSource: ImageSourcePropType;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  value,
  onChangeText,
  placeholder = '',
  iconSource,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <Text style={styles.colon}>:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#808080"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  colon: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
    // fontFamily: fonts.regular,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderColor: '#783CE5',
  },
});

export default InputWithIcon;



/*
*****************not me*******************************
const [inputValue, setInputValue] = useState('');

<InputWithIcon
  value={inputValue}
  onChangeText={setInputValue}
  placeholder="Enter text"
  iconSource={require('../../assets/images/icon.png')}
/>
************************************************
*/