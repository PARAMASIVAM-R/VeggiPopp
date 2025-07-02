import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/Button/CustomButton';
import { showToast } from '../../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showToast('Please fill all fields');
      return;
    }

    const userData = { name, email, password };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      showToast('Registered Successfully');
      navigation.replace('Login');
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Registration Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Register" onPress={handleRegister} />
      <CustomButton title="Already have an account? Login" onPress={() => navigation.navigate('Login')} />
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

export default RegisterScreen;
