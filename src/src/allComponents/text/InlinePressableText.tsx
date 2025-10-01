import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

interface InlineTextSegment {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  pressedColor?: string;
  pressedOpacity?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

interface InlinePressableTextProps {
  segments: InlineTextSegment[];
  containerStyle?: ViewStyle;
}

const InlinePressableText: React.FC<InlinePressableTextProps> = ({
  segments,
  containerStyle,
}) => {
  return (
    <Text style={[styles.line, containerStyle]}>
      {segments.map((segment, index) => {
        const {
          text,
          color = 'black',
          fontSize = 15,
          fontWeight = 'normal',
          textDecorationLine = 'none',
          pressedColor = color,
          pressedOpacity = 1,
          onPress,
        } = segment;

        const [isPressed, setPressed] = useState(false);

        return (
          <Text
            key={index}
            style={{
              color: isPressed ? pressedColor : color,
              fontSize,
              fontWeight,
              opacity: isPressed ? pressedOpacity : 1,
              textDecorationLine: isPressed ? textDecorationLine : 'none',
            }}
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
          >
            {text}
          </Text>
        );
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexShrink: 1,
  },
});

export default InlinePressableText;






/*
*************************************************
<InlinePressableText
  segments={[
    { text: 'By continuing you agree to our', color: 'black' },
    {
      text: ' Terms of Service ',
      color: 'green',
      fontSize:40,
      fontWeight: 'bold',
      pressedColor: 'blue',
      pressedOpacity: 0.6,
      textDecorationLine: 'underline', 
      onPress: () => console.log('Terms clicked'),
    },
    { text: 'and', color: 'black' },
    {
      text: ' Privacy Policy ',
      color: 'green',
      fontWeight: 'bold',
      pressedColor: 'red',
      pressedOpacity: 0.9,
      textDecorationLine: 'none',
      onPress: () => console.log('Privacy clicked'),
    },
    { text: '.', color: 'black' },
  ]}
/>


*************************************************
*/
