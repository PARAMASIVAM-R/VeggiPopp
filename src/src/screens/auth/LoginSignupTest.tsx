import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginSignupTest = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <Text>Test Component - {isLogin ? 'Login' : 'Signup'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginSignupTest;