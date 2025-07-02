
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const Description = ({
  title,
  color = colors.white,
  size = 14,
  fontWeight = 400,
  align = 'left',
  paddingVertical = 10,
  paddingHorizontal = 10,
  style = {},
  onPress = () => {},     // default no-op
  disabled = true         // default: not clickable
}) => (
  <TouchableOpacity
    onPress={!disabled ? onPress : undefined}
    disabled={disabled}
    activeOpacity={disabled ? 1 : 0.6}
    style={{
      alignItems: align,
      paddingVertical,
      paddingHorizontal,
    }}
  >
    <Text
      style={[
        styles.title,
        {
          color,
          fontSize: size,
          textAlign: align,
          fontWeight:fontWeight,
        },
        style,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // title: {
  //   fontWeight: '400',
  // },
});

export default Description;





/* 
*******************************************************
<Description title="This is a simple note." />

<Description
  title="Description with custom color and size"
  color="#ccc"
  size={16}
  align="center"
  onPress={() => console.log('Description pressed')}
  disabled={false}
/>

<Description
  title="Styled description"
  style={{ fontStyle: 'italic', lineHeight: 22 }}
/>

*******************************************************
*/
