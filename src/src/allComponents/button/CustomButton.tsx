import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  width?: number | string;
  borderRadius?: number;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}


const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
  paddingVertical = 0,
  paddingHorizontal =0,
  width,
  borderRadius = 10,
  fontSize = 16,
  align = 'center',
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        {
          width: width || '100%',
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          paddingVertical:   paddingVertical,
          paddingHorizontal: paddingHorizontal,
          borderRadius: borderRadius ?? 10,
          alignSelf:
            align === 'left'
              ? 'flex-start'
              : align === 'right'
              ? 'flex-end'
              : 'center',
        },
        style,  
]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: textColor,
            fontSize,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,

  },
  buttonText: {
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default CustomButton;






/* 
*******************************************************
🟦 Default button
<CustomButton title="Submit" onPress={() => console.log('Pressed')} />

🟥 Custom color & radius
<CustomButton
  title="Delete"
  onPress={() => {}}
  backgroundColor="red"
  borderRadius={5}
/>

🎯 Right-aligned with smaller font
<CustomButton
  title="Next"
  onPress={() => {}}
  align="right"
  fontSize={14}
/>

🚫 Disabled
<CustomButton
  title="Submit"
  onPress={() => {}}
  disabled={true}
/>

🟦 All in one place
<CustomButton
  title="Get Started"
  onPress={() => {}}
  backgroundColor="blue"
  borderRadius={10}
  fontSize={20}
  align='center'
  paddingHorizontal={20}
  paddingVertical={5}
  disabled={false}
  style={{marginTop: 10}}
  
/>

*******************************************************
*/
