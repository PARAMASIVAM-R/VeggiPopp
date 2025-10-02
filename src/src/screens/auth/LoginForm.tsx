import React from 'react';
import { View } from 'react-native';
import Header from '../../allComponents/text/Header';
import Description from '../../allComponents/text/Description';
import { InputField } from '../../allComponents/forProject/InputField';
import { InputFieldWithIcon } from '../../allComponents/forProject/InputFieldWithIcon';
import CustomButton from '../../allComponents/button/CustomButton';
import commonlayout from '../../styles/layout';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onSwitchToSignup,
}) => {
  return (
    <>
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

      <InputField
        label="Emahhkjil"
        value={email}
        onChangeText={onEmailChange}
        placeholder="Enter email"
        // keyboardType="email-address"
      />

      <InputFieldWithIcon
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Enter your password"
        iconEmpty={require('../../assets/images/password-hide.png')}
        iconFilled={require('../../assets/images/password-show.png')}
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
        onPress={onLogin}
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
          onPress={onSwitchToSignup}
        />
      </View>
    </>
  );
};

export default LoginForm;