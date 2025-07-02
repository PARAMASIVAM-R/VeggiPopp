import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface CustomButtonWithIconProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
  disabled?: boolean;
  icon?: ImageSourcePropType;
  iconSize?: number;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButtonWithIcon: React.FC<CustomButtonWithIconProps> = ({
  title,
  onPress,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
  paddingVertical = 0,
  paddingHorizontal = 0,
  borderRadius = 0,
  fontSize = 16,
  align = 'center',
  disabled = false,
  icon,
  iconSize = 20,
  iconPosition = 'left',
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
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          paddingVertical,
          paddingHorizontal,
          borderRadius,
          alignSelf:
            align === 'left'
              ? 'flex-start'
              : align === 'right'
              ? 'flex-end'
              : 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <Image
          source={icon}
          style={[styles.icon, { width: iconSize, height: iconSize, marginRight: 8 }]}
        />
      )}
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
      {icon && iconPosition === 'right' && (
        <Image
          source={icon}
          style={[styles.icon, { width: iconSize, height: iconSize, marginLeft: 8 }]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default CustomButtonWithIcon;




/*
*************************************************************** 
<CustomButtonWithIcon
  title="Continue with Facebook"
  onPress={() => console.log('Pressed')}
  backgroundColor="#4A66AC"
  borderRadius={15}
  fontSize={15}
  align="center"
  paddingHorizontal={40}
  paddingVertical={13}
  disabled={false}
  style={{marginTop: 10, gap:30}}
  icon={require('../../assets/images/facebook.png')}
  iconPosition="left"
  iconSize={22}
/>
**************************************************************
*/