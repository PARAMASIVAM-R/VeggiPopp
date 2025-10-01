import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,

  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import IconButton from '../../components/image/IconButton';


import {showToast} from '../../utils/toast';  
import { isValidEmail, isValidPassword } from '../../utils/validators';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginSignup = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    console.error('AuthContext not found');
    return null;
  }
  
  const { login } = authContext;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  console.log('isLogin:::::', isLogin);

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      showToast('Please fill all fields');
      return;
    }

    const userData = {userName, email, password};
    console.log('userData :::', userData);

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      showToast('Registered Successfully');
      setIsLogin(true);
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Registration Failed');
    }
  };

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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <IconButton
              icon={require('../../assets/images/logo.png')}
              onPress={() => console.log('Pressed')}
              width={80}
              height={80}
              borderRadius={10}
              align="center"
              backgroundColor="transparent"
              disabled={true}
            />
          </View>
          <View style={styles.bottomContainer}>
            {isLogin ? (
              <LoginForm
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onLogin={handleLogin}
                onSwitchToSignup={() => setIsLogin(false)}
              />
            ) : (
              <SignupForm
                userName={userName}
                email={email}
                password={password}
                onUserNameChange={setUserName}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSignup={handleRegister}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    height: 150,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 2.5,
    paddingHorizontal: 10,
    gap: 5,
    // backgroundColor: 'gray',
  },
});



