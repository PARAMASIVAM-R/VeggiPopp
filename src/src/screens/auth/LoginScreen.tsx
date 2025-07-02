import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/Button/CustomButton';
import { AuthContext } from '../../context/AuthContext';

import { isValidEmail, isValidPassword } from '../../utils/validators';
import { showToast } from '../../utils/toast';

import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setLoading(true);
 
  setTimeout(async () => {
    if (!isValidEmail(email)) {
      showToast('Invalid Email');
    } else if (!isValidPassword(password)) {
      showToast('Invalid Password');
    } else {
      try {
        const storedUser = await AsyncStorage.getItem('user');

        if (!storedUser) {
          showToast('No user found. Please register.');
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (
          parsedUser.email === email.trim() &&
          parsedUser.password === password
        ) {
          login(); // call context login
          showToast('Logined Successfully');
        } else {
          showToast('Incorrect email or password');
        }
      } catch (err) {
        console.error('Login error:', err);
        showToast('Login failed');
      }
    }

    setLoading(false);
  }, 1500);
};


  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <Text style={styles.title}>Login</Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} secureTextEntry={undefined} />
      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
