import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  View,
} from 'react-native';

interface IconButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  width?:  number|string;
  height?: number|string;
  backgroundColor?: string;
  borderRadius?: number;
  align?: 'left' | 'center' | 'right'; // predefined options
  containerStyle?: ViewStyle;         // custom override
  disabled?: boolean;
  opacity?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  width = 60,
  height = 60,
  backgroundColor = '#4CAF50',
  borderRadius =0,
  align = 'left',
  containerStyle,
  disabled = false,
  opacity = 1,
}) => {
  const alignmentStyles: ViewStyle = {
    alignSelf:
      align === 'left'
        ? 'flex-start'
        : align === 'right'
        ? 'flex-end'
        : 'center',
  };

  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
      style={[
        styles.button,
        {
          width: width,
          height: height,
          borderRadius: borderRadius,
          backgroundColor: disabled ? backgroundColor : backgroundColor,
        //   backgroundColor: disabled ? '#ccc' : backgroundColor,
          opacity: disabled ? opacity : 1,
        },
        alignmentStyles,
        containerStyle,
      ]}
    >
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );

// return disabled ? (
//   <View
//     style={[
//       styles.button,
//       {
//         width:width,
//         height:height,
//         borderRadius:borderRadius,
//         backgroundColor: backgroundColor,
//         opacity: 1,
//       },
//       alignmentStyles,
//       containerStyle,
//     ]}
//   >
//     <Image source={icon} style={styles.icon} />
//   </View>
// ) : (
//   <TouchableOpacity
//     onPress={onPress}
//     style={[
//       styles.button,
//       {
//         width:width,
//         height:height,
//         borderRadius:borderRadius,
//         backgroundColor: backgroundColor,
//       },
//       alignmentStyles,
//       containerStyle,
//     ]}
//   >
//     <Image source={icon} style={styles.icon} />
//   </TouchableOpacity>
// );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    padding:2,
  },
  icon: {
    width:  '101%',
    height: '101%',
    resizeMode: 'contain',
  },
});

export default IconButton;







/* 
*******************************************************
                🟢 Circle (default)
<IconButton
icon={require('./assets/icons/arrow.png')}
onPress={() => console.log('Pressed')}
/>

                🟦 Rounded Rectangle
<IconButton
  icon={require('./assets/icons/arrow.png')}
  onPress={() => console.log('Tapped!')}
  width={100}
  height={50}
  borderRadius={10}
  backgroundColor="#53B175"
  disabled={false}
  opacity={0.5}
  alignmentStyles={{ justifyContent: 'center' }}
  containerStyle={{ marginTop: 20 }}
/>

                🟥 Fully Square
<IconButton
  icon={require('./assets/icons/arrow.png')}
  onPress={() => console.log('Pressed')}
  width = {60},
  height = {60},
  borderRadius={0}
/>
*******************************************************
*/