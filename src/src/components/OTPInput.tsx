import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Platform,
  Keyboard,
  Animated,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const { Value, Text: AnimatedText } = Animated;

interface AnimatedOTPInputProps {
  cellCount?: number;
  onChangeText?: (value: string) => void;
  containerStyle?: ViewStyle;
  cellStyle?: TextStyle;
  activeCellColor?: string;
  notEmptyCellColor?: string;
  defaultCellColor?: string;
}

const AnimatedOTPInput: React.FC<AnimatedOTPInputProps> = ({
  cellCount = 6,
  onChangeText,
  containerStyle,
  cellStyle,
  activeCellColor = '#fff',
  notEmptyCellColor = '#fff',
  defaultCellColor = '#fff',
}) => {
  const CELL_SIZE = 40;
  const CELL_BORDER_RADIUS = 8;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const animationsColor = [...new Array(cellCount)].map(() => new Value(0));
  const animationsScale = [...new Array(cellCount)].map(() => new Value(1));

  useEffect(() => {
    onChangeText?.(value);
  }, [value]);

  const animateCell = ({
    hasValue,
    index,
    isFocused,
  }: {
    hasValue: boolean;
    index: number;
    isFocused: boolean;
  }) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 50,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0.88 : 1,
        duration: 50,
      }),
    ]).start();
  };

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => {
    const hasValue = Boolean(symbol);

    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [notEmptyCellColor, activeCellColor],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [defaultCellColor, activeCellColor],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, { height: CELL_SIZE, width: CELL_SIZE }, animatedCellStyle, cellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View style={[styles.codeInputContainer, containerStyle]}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={[styles.codeFieldRoot, { height: CELL_SIZE }]}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeInputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  codeFieldRoot: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cell: {
    lineHeight: 38,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 8,
    color: 'green',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5.22,
    elevation: 3,
    ...Platform.select({ web: { lineHeight: 65 } }),
  },
});

export default AnimatedOTPInput;
