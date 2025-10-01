import React from 'react';
import { View } from 'react-native';
import Header from '../../allComponents/text/Header';
import Description from '../../allComponents/text/Description';
import { InputField } from '../../allComponents/forProject/InputField';
import { InputFieldWithIcon } from '../../allComponents/forProject/InputFieldWithIcon';
import CustomButton from '../../allComponents/button/CustomButton';
import InlinePressableText from '../../allComponents/text/InlinePressableText';
import commonlayout from '../../styles/layout';

interface SignupFormProps {
  userName: string;
  email: string;
  password: string;
  onUserNameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  userName,
  email,
  password,
  onUserNameChange,
  onEmailChange,
  onPasswordChange,
  onSignup,
  onSwitchToLogin,
}) => {
  return (
    <>
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

      <InputField
        label="Username"
        value={userName}
        onChangeText={onUserNameChange}
        placeholder="Enter username"
      />

      <InputField
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        placeholder="Enter email"
        keyboardType="email-address"
      />

      <InputFieldWithIcon
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Enter your password"
        iconEmpty={require('../../assets/images/password-hide.png')}
        iconFilled={require('../../assets/images/password-show.png')}
      />

      <View style={commonlayout.rowLeft}>
        <InlinePressableText
          segments={[
            {text: 'By continuing you agree to our', color: '#888'},
            {
              text: ' Terms of Service ',
              color: 'green',
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
              textDecorationLine: 'underline',
              onPress: () => console.log('Privacy clicked'),
            },
            {text: '.', color: 'black'},
          ]}
        />
      </View>

      <CustomButton
        title="Sign Up"
        onPress={onSignup}
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
          paddingHorizontal={0}
          disabled={false}
          onPress={onSwitchToLogin}
        />
      </View>
    </>
  );
};

export default SignupForm;