import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';

import Header from '../../components/text/Header';
import Description from '../../components/text/Description';
import IconButton from '../../components/image/IconButton';

//-----------------vv----------------
import {useForm, FieldValues} from 'react-hook-form';
import PhoneInputField from '../../components/PhoneInputField';
import CustomButton from '../../components/Button/CustomButton';
import CustomButtonWithIcon from '../../components/Button/CustomButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

// Assuming you have the image in your assets
const SignInScreen = () => {
  //--------------------vvv------------------------------
  const {control, handleSubmit} = useForm();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation()

  const onSubmit = (data: FieldValues) => {
    Alert.alert('Submitted Phone Number', data.phoneNumber);
   navigation.navigate('OtpAndLocation')
  };

  return (
    <View style={{flex: 1}}>
      {!isInputFocused && (
        <View style={styles.topHalf}>
          <IconButton
            icon={require('../../assets/images/grocery.png')}
            onPress={() => console.log('Pressed')}
            width="100%"
            height="100%"
            backgroundColor="#FCFCFC"
            borderRadius={0}
            disabled={true}
          />
        </View>
      )}

      <View style={styles.container}>
        {/* Bottom half with content */}
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.bottomHalf}>
            {isInputFocused ? (
              <>
                <Header
                  title="Enter your mobile number"
                  color="#000"
                  size={25}
                  alignItems="left"
                  textAlign="left"
                  backgroundColor="#fcfcfc"
                  paddingVertical={20}
                  paddingHorizontal={10}
                />
                <Description
                  title="Mobile Number"
                  color="#888"
                  size={16}
                  align="center"
                  paddingVertical={0}
                />
              </>
            ) : (
              <Header
                title={`Get your groceries\nwith nectar`}
                color="black"
                size={25}
                alignItems="center"
                textAlign="left"
                backgroundColor="transparent"
              />
            )}

            <View style={{paddingTop: 15, marginHorizontal: 10}}>
              <PhoneInputField
                name="phoneNumber"
                control={control}
                defaultValue="+918524981387"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </View>
            {!isInputFocused && (
              <View style={{flex: 0, alignItems: 'center', width: '100%'}}>
                <Description
                  title="Or connect with social media"
                  color="#888"
                  size={15}
                  align="center"
                />

                <CustomButtonWithIcon
                  title="Continue with Google"
                  onPress={() => console.log('Pressed')}
                  backgroundColor="#5383EC"
                  borderRadius={15}
                  fontSize={15}
                  align="center"
                  width="100%"
                  paddingVertical={12}
                  disabled={false}
                  style={{marginTop: 10, gap: 20}}
                  icon={require('../../assets/images/google.png')}
                  iconPosition="left"
                  iconSize={22}
                  textStyle={{textAlign: 'left'}}
                />

                <CustomButtonWithIcon
                  title="Continue with Facebook"
                  onPress={() => console.log('Pressed')}
                  backgroundColor="#4A66AC"
                  borderRadius={15}  
                  fontSize={15}
                  align="center"
                  paddingVertical={13}
                  disabled={false}
                  style={{marginTop: 10, gap: 30}}
                  icon={require('../../assets/images/facebook.png')}
                  iconPosition="left"
                  iconSize={22}
                />
              </View>
            )}
          </View>
          {isInputFocused && (
            <IconButton
              icon={require('../../assets/images/ForwordGreenArrow.png')}
              onPress={handleSubmit(onSubmit)}
              width={60}
              height={60}
              borderRadius={30} // Rectangle with rounded corners
              backgroundColor="#53B175"
              align="right"
            />
          )}
        </ScrollView>
      </View>

      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  topHalf: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(184, 94, 94, 0.89)',
  },
  container: {
    flex: 2,
    backgroundColor: '#FCFCFC',
  },
 
  bottomHalf: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
 
 
 
 
 

});
