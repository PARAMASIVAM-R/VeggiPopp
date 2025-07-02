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

//-----------------vv----------------
import {useForm, FieldValues} from 'react-hook-form';
import PhoneInputField from '../../components/PhoneInputField';

// Assuming you have the image in your assets
const SignInScreen = () => {
  //--------------------vvv--------yyyyyyyyyyyyyyy----------------------
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: FieldValues) => {
    Alert.alert('Submitted Phone Number', data.phoneNumber);
  };

  return (
    <View style={{flex: 1}}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.topHalf}>
        <Image
          source={require('../../../assets/images/grocery.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.container}>


        {/* Bottom half with content */}
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.bottomHalf}>
            <Text style={styles.title}>
              Get your groceries{'\n'}with nectar
            </Text>

            <View style={{padding: 24, backgroundColor: 'lightblue'}}>
              <PhoneInputField
                name="phoneNumber"
                control={control}
                defaultValue="+911234567890"
              />

              {/* <TouchableOpacity
                style={{
                  marginTop: 20,
                  paddingVertical: 12,
                  backgroundColor: '#2196F3',
                  borderRadius: 4,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
                  Submit
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{flex: 1, backgroundColor: 'grey'}}>
        <Text style={styles.socialText}>Or connect with social media</Text>

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fbBtn}>
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(184, 94, 94, 0.89)',
  },
    container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomHalf: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(119, 175, 46, 0.82)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneInputWrapper: {
    width: '80%',
    marginBottom: 20,
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 16,
  },
  socialText: {
    marginVertical: 10,
    color: '#888',
  },
  googleBtn: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  fbBtn: {
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
