import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import IconButton from '../../components/image/IconButton';
import Header from '../../components/text/Header';
import Description from '../../components/text/Description';
import OTPInput from '../../components/OTPInput';
import {useNavigation} from '@react-navigation/native';
import commonlayout from '../../styles/layout';

const OtpAndLocation = () => {
  const navigation = useNavigation();

  return (
    //   <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1 }}
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // tweak this value as needed
    // >
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <IconButton
          icon={require('../../assets/images/backArrow.png')}
          onPress={() => navigation.goBack()}
          width={23}
          height={23}
          borderRadius={0}
          align="left"
          backgroundColor="#fff"
        />

        <Header
          title={'Enter your 4-digit code'}
          color="black"
          size={24}
          alignItems="left"
          textAlign="left"
          backgroundColor="transparent"
          paddingHorizontal={10}
          paddingVertical={10}
        />

        <Description
          title="code"
          color="#888"
          size={16}
          align="left"
          paddingVertical={0}
        />

        <OTPInput
          cellCount={4}
          onChangeText={otp => console.log('Entered OTP:', otp)}
          containerStyle={{marginVertical: 20}}
          cellStyle={{borderWidth: 1, borderColor: '#ccc'}}
          activeCellColor="#fff"
          notEmptyCellColor="#f0f0f0"
          defaultCellColor="#eee"
        />
      </View>
      <View style={commonlayout.spacedBetween}>
        <Description
          title="Resend code"
          color="#53B175"
          size={16}
          paddingVertical={0}
          onPress={() => console.log('Description pressed')}
          disabled={true}
        />
        <IconButton
          icon={require('../../assets/images/ForwordGreenArrow.png')}
          onPress={() => {navigation.navigate('LoginSignup')}}
          width={60}
          height={60}
          borderRadius={30}
          backgroundColor="#53B175"
        />
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default OtpAndLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
  },
});

/*
**********************************************************
<AnimatedOTPInput
  cellCount={6}
  onChangeText={(otp) => console.log('Entered OTP:', otp)}
  containerStyle={{ marginVertical: 20 }}
  cellStyle={{ borderWidth: 1, borderColor: '#ccc' }}
  activeCellColor="#fff"
  notEmptyCellColor="#f0f0f0"
  defaultCellColor="#eee"
/>

**********************************************************
*/
