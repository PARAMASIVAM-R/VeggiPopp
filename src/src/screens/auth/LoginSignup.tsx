import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import IconButton from '../../components/image/IconButton';
import commonlayout from '../../styles/layout';
import Description from '../../components/text/Description';
import Header from '../../components/text/Header';
import CustomInput from '../../components/input/CustomInput';
import CustomInputWithIcon from '../../components/input/CustomInputWithIcon';

import PasswordInput from '../../components/input/PasswordInput';
import CustomButton from '../../components/Button/CustomButton';
import InlinePressableText from '../../components/text/InlinePressableText';

import {showToast} from '../../utils/toast';  
import { isValidEmail, isValidPassword } from '../../utils/validators';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const LoginSignup = () => {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  console.log('isLogin:::::', isLogin);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          {isLogin && (
            <View style={styles.bottomContainer}>
              <Header
                title="Login"
                color="black"
                size={25}
                alignItems="left"
                textAlign="left"
                backgroundColor="transparent"
                paddingHorizontal={0}
              />

              <Description
                title="Enter your email and password"
                color="#888"
                size={16}
                align="left"
                paddingHorizontal={0}
              />

              <CustomInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                borderColor="#e2e2e2"
                isColumn={true}
                inputContainerStyle={{
                  borderBottomWidth: 1.3,
                  borderRadius: 5,
                  borderWidth: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.07)',
                }}
              />

              <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                showIcon={require('../../assets/images/logo.png')}
                hideIcon={require('../../assets/images/facebook.png')}
                placeholderTextColor="#888"
                isColumn={true}
                inputContainerStyle={{
                  borderBottomWidth: 1.3,
                  borderRadius: 5,
                  borderWidth: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.07)',
                }}
              />
              <Description
                title="Forget Password ?"
                color="#888"
                size={16}
                align="flex-end"
                paddingHorizontal={0}
              />

              <CustomButton
                title="Log in"
                onPress={handleLogin}
                backgroundColor="#53B175"
                borderRadius={10}
                fontSize={16}
                align="center"
                width="100%"
                paddingVertical={15}
                disabled={false}
                style={{marginTop: 10}}
              />

              <View style={commonlayout.rowCenter}>
                <Description
                  title="Don't have an account ?"
                  color="#000"
                  size={16}
                  paddingHorizontal={10}
                />

                <Description
                  title="Signup"
                  color="#53B175"
                  size={16}
                  paddingHorizontal={0}
                  disabled={false}
                  onPress={() => setIsLogin(false)}
                />
              </View>
            </View>
          )}

          {!isLogin && (
            <View style={styles.bottomContainer}>
              <Header
                title="Sign Up"
                color="black"
                size={25}
                alignItems="left"
                textAlign="left"
                backgroundColor="transparent"
                paddingHorizontal={0}
              />

              <Description
                title="Enter your credentials to continue"
                color="#888"
                size={16}
                align="left"
                paddingHorizontal={0}
              />

              <CustomInput
                label="Username"
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter username"
                borderColor="#e2e2e2"
                isColumn={true}
                inputContainerStyle={{
                  borderBottomWidth: 1.3,
                  borderRadius: 5,
                  borderWidth: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.07)',
                }}
              />

              <CustomInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                borderColor="#e2e2e2"
                isColumn={true}
                inputContainerStyle={{
                  borderBottomWidth: 1.3,
                  borderRadius: 5,
                  borderWidth: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.07)',
                }}
              />

              <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                showIcon={require('../../assets/images/logo.png')}
                hideIcon={require('../../assets/images/facebook.png')}
                placeholderTextColor="#888"
                isColumn={true}
                inputContainerStyle={{
                  borderBottomWidth: 1.3,
                  borderRadius: 5,
                  borderWidth: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.07)',
                }}
              />

              <View style={commonlayout.rowLeft}>
                <InlinePressableText
                  segments={[
                    {text: 'By continuing you agree to our', color: '#888'},
                    {
                      text: ' Terms of Service ',
                      color: 'green',
                      // fontSize:12,
                      fontWeight: 400,
                      pressedColor: 'blue',
                      pressedOpacity: 0.6,
                      textDecorationLine: 'underline',
                      onPress: () => console.log('Terms clicked'),
                    },
                    {text: 'and', color: '#888'},
                    {
                      text: ' Privacy Policy ',
                      color: 'green',
                      fontWeight: 400,
                      pressedColor: 'red',
                      pressedOpacity: 0.9,
                      textDecorationLine: 'none',
                      onPress: () => console.log('Privacy clicked'),
                    },
                    {text: '.', color: 'black'},
                  ]}
                />
              </View>

              <CustomButton
                title="Sign Up"
                onPress={handleRegister}
                backgroundColor="#53B175"
                borderRadius={10}
                fontSize={16}
                align="center"
                width="100%"
                paddingVertical={15}
                disabled={false}
                style={{marginTop: 10}}
              />

              <View style={commonlayout.rowCenter}>
                <Description
                  title="Already have an account ?"
                  color="#000"
                  size={16}
                  paddingHorizontal={10}
                />

                <Description
                  title="Login"
                  color="#53B175"
                  size={16}
                  fontWeight={700}
                  paddingHorizontal={0}
                  disabled={false}
                  onPress={() => setIsLogin(true)}
                />
              </View>
            </View>
          )}
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
