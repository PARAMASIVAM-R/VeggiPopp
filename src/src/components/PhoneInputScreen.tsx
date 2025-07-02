import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Clipboard,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  SafeAreaView,
} from 'react-native';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import properties from '../../../targetenv.json';
import axios from 'axios';
import Custom_Alert from '../../Alarm/Custom_Alert';
import {BackHandler} from 'react-native';
import {getAccessToken_Auth} from './authService';
import NetInfo from '@react-native-community/netinfo';

import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const api = axios.create({
  baseURL: properties.API_BASE_URL,
});
const USER_POOL_ID = properties.USER_POOL_ID;
const APP_CLIENT_ID = properties.APP_CLIENT_ID;

const isTablet = DeviceInfo.isTablet();
const isPortrait = height > width;
const isTabletPortrait = isTablet && isPortrait;
const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

//-------------------------------vvvvvvvvvvvvvvvvvvvvv
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const CELL_SIZE = isTabletPortrait? rh(6):40;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#fff';
const ACTIVE_CELL_BG_COLOR = '#fff';

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 50,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0.88 : 1,
      duration: 50,
    }),
  ]).start();
};

const Verification: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const logo = require('../../../src/assets/AroCordLogo.png');
  // const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null); // added new
  const [errors, setErrors] = useState(Array(6).fill(false));
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [inputBoxBorderColors, setInputBoxBorderColors] = useState<string[]>(
    Array(6).fill('rgba(0, 0, 0, 0.20)'),
  );
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullMobileNumber, setFullMobileNumber] = useState<string | null>(
    route.params?.fullMobileNumber || null,
  );
  const [password, setPassword] = useState<string | null>(
    route.params?.password || null,
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [selection, setSelection] = useState<{start: number; end: number}>({
    start: 0,
    end: 0,
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //----------------------------------vvvvvvvvvvvvvvvvvvvvvv------
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);

    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    useEffect(() => {
      const isCodeComplete = value.length === 6;
      setIsButtonEnabled(isCodeComplete);
    }, [value]);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  console.log('otp value:', value);

  // useEffect(() => {
  //   const isCodeComplete = value.length === 6;
  //   setIsButtonEnabled(isCodeComplete);
  // }, [value]);

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const backArrow = require('../../../assets/back.png');

  useEffect(() => {
    console.log('Navigated from:', route.params?.fromScreen); // Log the fromScreen parameter to verify it
  }, []);
  // Handle back press
  const handleBackPress = () => {
    const fromScreen = route.params?.fromScreen; // get the value of fromScreen from params
    if (fromScreen === 'Signup') {
      navigation.replace('Signup');
    } else if (fromScreen === 'Login') {
      navigation.replace('Login');
    }
    return true;
  };

  useEffect(() => {
    // Resend OTP on component mount if requested
    if (route.params?.resendOTPOnMount) {
      resendOTP();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [navigation, route.params]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 300); // Add 300ms delay for Android

    return () => clearTimeout(timeout);
  }, []);

  const checkCodeValidity = async newCode => {
    if (!fullMobileNumber || !password) return;

    const verificationCode = newCode;
    const cognitoUser = new CognitoUser({
      Username: fullMobileNumber,
      Pool: userPool,
    });

    setIsLoading(true);

    try {
      await new Promise<void>((resolve, reject) => {
        cognitoUser.confirmRegistration(
          verificationCode,
          true,
          (err, result) => {
            if (err) {
              if (err.value === 'UserNotConfirmedException') {
                resendOTP();
              }
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: fullMobileNumber,
        Password: password,
      });

      await new Promise<void>((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: async result => {
            const accessToken = result.getAccessToken().getJwtToken();
            const idToken = result.getIdToken().getJwtToken();
            const refreshToken = result.getRefreshToken().getToken();

            try {
              await AsyncStorage.setItem('accessToken', accessToken);
              await AsyncStorage.setItem('idToken', idToken);
              await AsyncStorage.setItem('refreshToken', refreshToken);
              await AsyncStorage.setItem('mobileNumber', fullMobileNumber);
              const headers = {Authorization: `Bearer ${accessToken}`};

              // Helper function to format date to required format
              const formatDate = (date: Date) => {
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
                const hours = ('0' + date.getHours()).slice(-2);
                const minutes = ('0' + date.getMinutes()).slice(-2);
                const seconds = ('0' + date.getSeconds()).slice(-2);

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              };

              try {
                const token = await getAccessToken_Auth();
                const headers = {Authorization: `Bearer ${token}`};
                const createdAt = formatDate(new Date()); // Format the date correctly

                console.log('token', token);
                console.log('headers', headers);
                console.log('createdAt', createdAt);

                // Call sign-up API
                const signUpSuccess = await signUp(
                  headers,
                  fullMobileNumber,
                  createdAt,
                );
                console.log('signup', signUpSuccess);

                if (signUpSuccess) {
                  // Call AroCord_Records API
                  const recordsPostSuccess = await postToAroCordRecords(
                    headers,
                  );

                  if (recordsPostSuccess) {
                    // Retrieve the ID from the records API
                    const recordsGetResponse = await api.get(
                      `/AroCord_Records?Mobile_Number=${fullMobileNumber}`,
                      {headers},
                    );

                    if (
                      recordsGetResponse.status === 200 &&
                      recordsGetResponse.data.length > 0
                    ) {
                      await AsyncStorage.setItem(
                        'mobileNumber',
                        fullMobileNumber,
                      );
                      console.log('mobileNumber', fullMobileNumber);

                      const response = await api.get('/AroCord_Records', {
                        headers,
                      });
                      const records = response.data;

                      const matchingRecord = records.find(
                        (record: {Mobile_Number: string}) =>
                          record.Mobile_Number === fullMobileNumber,
                      );

                      if (matchingRecord) {
                        await AsyncStorage.setItem('userId', matchingRecord.ID);
                      }
                      // navigation.navigate('CreateAccount');
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'CreateAccount'}],
                      });

                      resolve();

                      // Navigate to the Verification screen
                    } else {
                      showAlert(
                        'Error',
                        'Failed to retrieve ID from records. Please try again.',
                      );
                    }
                  }
                }
              } catch (error) {
                if (!error.response) {
                  // No response received - could be a network issue
                  if (error.message === 'Network Error') {
                    showAlert(
                      'Network Error',
                      'Please check your internet connection.',
                    );
                  } else {
                    console.log(
                      'An unknown network issue occurred:',
                      error.message,
                    );
                  }
                } else {
                  // Handle specific response statuses
                  if (error.response.status === 404) {
                    console.log('404 Not Found: RootUserInformation not found');
                    showAlert(
                      'Root User Information Not Found',
                      'Please try again after some time.',
                    );
                  }

                  if (error.response.status === 401) {
                    console.log(
                      'Unauthourized access: RootUserInformation not found',
                    );
                    showAlert(
                      'Server Error',
                      'Please try again after some time.',
                    );
                  } else if (error.response.status === 500) {
                    showAlert(
                      'Server Unavailable',
                      'Please try again after sometime.',
                    );
                    console.log(
                      '500 Internal Server Error: RootUserInformation request failed',
                    );
                  } else if (error.response.status === 503) {
                    showAlert(
                      'Server Unavailable',
                      'Please try again after sometime.',
                    );
                    console.log(
                      '503  Server Unavilable: RootUserInformation request failed',
                    );
                  } else if (error.response.status === 504) {
                    showAlert(
                      'Server Unavailable',
                      'Please try again after sometime.',
                    );
                    console.log(
                      '504 Gateway Timeout: RootUserInformation request failed',
                    );
                  } else if (error.response.status === 502) {
                    showAlert(
                      'Server Unavailable',
                      'Please try again after sometime.',
                    );
                    console.log(
                      '502 Badgateway Timeout: RootUserInformation request failed',
                    );
                  }
                }
                setIsLoading(false);
                showAlert(
                  'Error',
                  error.message ||
                    'An error occurred during the sign-up process. Please try again.',
                );
              }
            } catch (error) {
              if (!error.response) {
                // No response received - could be a network issue
                if (error.message === 'Network Error') {
                  showAlert(
                    'Network Error',
                    'Please check your internet connection.',
                  );
                } else {
                  console.log(
                    'An unknown network issue occurred:',
                    error.message,
                  );
                }
              } else {
                // Handle specific response statuses
                if (error.response.status === 404) {
                  console.log('404 Not Found: RootUserInformation not found');
                  showAlert(
                    'Root User Information Not Found',
                    'Please try again after some time.',
                  );
                }

                if (error.response.status === 401) {
                  console.log(
                    'Unathourized access: RootUserInformation not found',
                  );
                  showAlert(
                    'Server Error',
                    'Please try again after some time.',
                  );
                } else if (error.response.status === 500) {
                  showAlert(
                    'Server Unavailable',
                    'Please try again after sometime.',
                  );
                  console.log(
                    '500 Internal Server Error: RootUserInformation request failed',
                  );
                } else if (error.response.status === 503) {
                  showAlert(
                    'Server Unavailable',
                    'Please try again after sometime.',
                  );
                  console.log(
                    '503  Server Unavilable: RootUserInformation request failed',
                  );
                } else if (error.response.status === 504) {
                  showAlert(
                    'Server Unavailable',
                    'Please try again after sometime.',
                  );
                  console.log(
                    '504 Gateway Timeout: RootUserInformation request failed',
                  );
                } else if (error.response.status === 502) {
                  showAlert(
                    'Server Unavailable',
                    'Please try again after sometime.',
                  );
                  console.log(
                    '502 Badgateway Timeout: RootUserInformation request failed',
                  );
                }
              }
              showAlert(
                'Storage Error',
                'An error occurred while storing data.',
              );
            }
          },
          onFailure: err => {
            reject(err);
          },
        });
      });
    } catch (error) {
      setVerificationError(error.message || JSON.stringify(error));
      setInputBoxBorderColors(Array(6).fill('red'));
      setIsLoading(false);
      showAlert('Invalid Verification Code', 'Please enter the correct code.');
    } finally {
      // setIsLoading(false);
      // showAlert('Network error', 'Please enter the correct code.');
    }
    inputRefs.current.forEach(ref => ref?.blur());
  };

  // Function to handle sign-up API call
  const signUp = async (headers, formattedInput, createdAt) => {
    console.log('headers', headers);
    console.log('formattedInput', formattedInput);
    console.log('createdAt', createdAt);

    try {
      // Make the POST request
      const signUpResponse = await api.post(
        '/SignUp',
        {
          Mobile_Number: formattedInput,
          Created_At: createdAt,
        },
        {headers},
      );

      // Check if the response status is 201 (Created)
      if (signUpResponse.status === 201) {
        console.log('Sign up successful');
        return true; // Sign up successful
      } else {
        // Handle non-201 status codes
        console.error(
          'Error: ',
          signUpResponse.data.error || 'Sign up failed on the backend',
        );
        throw new Error(
          signUpResponse.data.error || 'Sign up failed on the backend',
        );
      }
    } catch (error) {
      // Check if the error is from Axios (e.g., 502 status code)
      if (error.response) {
        // If the error is from Axios and has a response, handle specific status codes
        if (error.message === 'Network Error') {
          showAlert('Network Error', 'Please check your internet connection.');
        } else if (error.response.status === 500) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log('500 Internal Server Error');
        } else if (error.response.status === 503) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log('503  Server Unavailable');
        } else if (error.response.status === 504) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log('504 Gateway Timeout');
        } else if (error.response.status === 502) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log('502 Badgateway Timeout');
        } else if (error.response.status === 401) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            'Unauthorized access. Check your authentication credentials.',
          );
        } else {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            `Request failed with status code: ${error.response.status}`,
          );
        }
      } else if (error.request) {
        showAlert('Server Unavailable', 'Please try again after sometime.');
        // No response received from the server
        console.log('No response received. There might be a network issue.');
      } else {
        showAlert('Server Unavailable', 'Please try again after sometime.');
        // Other errors (e.g., network, timeout)
        console.log('Error during the request setup:', error.message);
      }

      // Throw a more user-friendly error message
      throw new Error(
        'An error occurred during sign up on the backend. Please try again.',
      );
    }
  };

  // Function to handle posting to AroCord_Records
  const postToAroCordRecords = async headers => {
    console.log('headerspost', headers);

    try {
      // Send request with headers correctly configured
      const recordsPostResponse = await api.post(
        '/AroCord_Records',
        {},
        {headers},
      );

      if (recordsPostResponse.status === 201) {
        console.log('Successfully posted to AroCord_Records');
        return true; // Successfully posted
      } else {
        console.log(
          'Error: ',
          recordsPostResponse.data.error ||
            'Error posting ID and mobile number.',
        );
        // throw new Error(recordsPostResponse.data.error || 'Error posting ID and mobile number.');
      }
    } catch (error) {
      console.error('Error posting to AroCord_Records:', error);
      if (!error.response) {
        // No response received - could be a network issue
        if (error.message === 'Network Error') {
          showAlert('Network Error', 'Please check your internet connection.');
        } else {
          console.log('An unknown network issue occurred:', error.message);
        }
      } else {
        // Handle specific response statuses
        if (error.response.status === 404) {
          console.log('404 Not Found: RootUserInformation not found');
          showAlert(
            'Root User Information Not Found',
            'Please try again after some time.',
          );
        }

        if (error.response.status === 401) {
          console.log('Unathourized access: RootUserInformation not found');
          showAlert('Server Error', 'Please try again after some time.');
        } else if (error.response.status === 500) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            '500 Internal Server Error: RootUserInformation request failed',
          );
        } else if (error.response.status === 503) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            '503  Server Unavilable: RootUserInformation request failed',
          );
        } else if (error.response.status === 504) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            '504 Gateway Timeout: RootUserInformation request failed',
          );
        } else if (error.response.status === 502) {
          showAlert('Server Unavailable', 'Please try again after sometime.');
          console.log(
            '502 Badgateway Timeour: RootUserInformation request failed',
          );
        }
      }

      // Handle other errors
      // throw new Error('Error posting ID and mobile number to records. Please try again.');
    }
  };

  const resendOTP = () => {
    if (!fullMobileNumber) return;

    const cognitoUser = new CognitoUser({
      Username: fullMobileNumber,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        showAlert(
          'No Internet',
          'Please check your internet connection and try again.',
        );
      } else {
        setResendTimer(30);
        setTimerActive(true);
        showAlert('Code Resent', 'A new code has been sent to your email.');
      }
    });
  };

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setResendTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  }, [timerActive]);

  useEffect(() => {
    if (resendTimer === 0) {
      setTimerActive(false);
    }
  }, [resendTimer]);

  const handlePress = () => {
    if (isLoading || isDisabled) return; // Prevent multiple clicks

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        showAlert(
          'No Internet',
          'Please check your internet connection and try again.',
        );
        return;
      }

      setIsLoading(true);
      setIsDisabled(true); // Disable the button

      checkCodeValidity(value)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
        .finally(() => {
          setTimeout(() => setIsDisabled(false), 2000); // Re-enable after 2 seconds
        });
    });
  };

  return (
    <ImageBackground
      source={require('../../../src/assets/BlurBg.png')}
      style={styles.background}>
      {/* // <KeyboardAvoidingView
      //   style={{
      //     flex: 1,
      //   }}
      //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      //   keyboardVerticalOffset={40}> */}

        <SafeAreaView style={[styles.card]}>
          <View style={styles.firstHalfRoot}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={
                {
                  // backgroundColor:'green', 
                  width: rh(4),
                   height: rh(4),
                    marginBottom: rh(2),
                   }
                }
                >
              <Image source={backArrow} style={styles.arrow} />
            </TouchableOpacity>
            <View
              style={[
                styles.subCard,
                // isKeyboardVisible && styles.subCard_hidden,
              ]}>
              <View>
                <Image
                  source={logo}
                  style={isTabletPortrait ? styles.logo_port : styles.logo}
                />
              </View>
              <View>
                <Text
                  style={
                    isTabletPortrait
                      ? styles.headerText_port_logo
                      : styles.headerText_logo
                  }>
                  AroCord
                </Text>
              </View>
            </View>
            <View style={styles.subCard_x}>

                <Text
                  style={
                    isTabletPortrait
                      ? styles.headerText_port
                      : styles.headerText
                  }>
                  Verification Code
                </Text>

            </View>
            <Text
              style={
                isTabletPortrait
                  ? styles.instructionText_port
                  : styles.instructionText
              }>
              Enter the OTP sent to your mail to verify your identity.
            </Text>

            {fullMobileNumber && (
              <TextInput
                style={styles.hiddenMobileNumberInput}
                value={fullMobileNumber}
                editable={false} // Make this field non-editable
                selectTextOnFocus={false} // Disable text selection
              />
            )}

            <View style={styles.codeInputContainer}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>

            {timerActive && resendTimer > 0 && (
              <Text style={styles.timer}>
                Resend Code in{' '}
                {resendTimer > 0
                  ? `0:${resendTimer.toString().padStart(2, '0')}`
                  : '00:00'}
              </Text>
            )}
            {!timerActive && (
              <TouchableOpacity style={styles.resendButton} onPress={resendOTP}>
                <Text style={styles.resendButtonText}>Resend Code</Text>
              </TouchableOpacity>
            )}
            <Custom_Alert
              visible={alertVisible}
              onClose={() => setAlertVisible(false)}
              title={alertTitle}
              message={alertMessage}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[styles.button, {opacity: isButtonEnabled ? 1 : 0.5}]}
              onPress={() => isButtonEnabled && !isDisabled && handlePress()}
              disabled={!isButtonEnabled || isDisabled}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    isTablet ? styles.buttonText_tablet : styles.buttonText
                  }>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      {/* </KeyboardAvoidingView> */}
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: rw(100),
    height: rh(100),
    resizeMode:"contain"
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    width: rw(100),
    marginTop: rh(8),
    // height: rh(99),
    // borderRadius: rh(4),
    borderTopLeftRadius: rh(4),
    borderTopRightRadius: rh(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    // shadowOffset: {width: 0, height: rh(1)},
    shadowRadius: rw(2),
    elevation: rw(2),
    // marginBottom: rw(0),
    paddingHorizontal: rw(5),
    paddingVertical: rw(5),
    // overflow:'hidden',
  },
  firstHalfRoot: {
    // padding: 20,
    flex: 1,
  },
  card_keyboard: {
    // marginTop: rh(2),
  },
  card_tablet: {
    backgroundColor: '#FFFFFF',
    width: rw(50),
    borderRadius: rh(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: rh(1)},
    shadowRadius: rw(2),
    elevation: rw(2),
    marginBottom: rw(0),
    paddingHorizontal: rw(2),
    paddingVertical: rw(2.5),
    marginTop: rh(5),
  },
  headerText: {
    fontWeight: '700',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(2.5),
    color: '#151515',
    // marginLeft: rh(2),
  },
  headerText_tab: {
    fontWeight: '700',
    fontSize: rf(2.1),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: '#151515',
    // marginLeft: rh(2),
  },
  headerText_port: {
    fontWeight: '700',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(2.3),
    color: '#151515',
    // marginLeft: rh(2),
  },
  headerText_logo: {
    fontWeight: '600',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(2.3),
    color: '#151515',
    marginLeft: rh(2),
  },
  headerText_tab_logo: {
    fontWeight: '600',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(1.7),
    color: '#151515',
    marginLeft: rh(2),
  },
  headerText_port_logo: {
    fontWeight: '600',
    fontSize: rf(2),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: '#151515',
    marginLeft: rh(2),
  },
  subHeaderText: {
    color: '#00000080',
    fontWeight: '400',
    fontSize: rf(1.65),
    marginBottom: rh(3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginTop: rw(2),
  },
  subHeaderText_port: {
    color: '#00000080',
    fontWeight: '400',
    fontSize: rf(1.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginBottom: rh(4),
    marginTop: rw(2),
  },
  subHeaderText_tablet: {
    color: '#00000080',
    fontWeight: '400',
    fontSize: rf(1.3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginBottom: rh(4),
    marginTop: rw(1),
  },
  mobileInputContainer: {
    borderColor: '#777',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rh(1),
    paddingHorizontal: rh(2),
    marginBottom: rh(2),
    height: isTabletPortrait ? rh(7) : rh(7),
  },
  countryCode: {
    color: '#151515',
    fontSize: rf(2),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginRight: rh(0.5),
  },
  countryCode_port: {
    color: '#151515',
    fontSize: rf(1.7),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginRight: rh(0.5),
  },
  countryCode_tablet: {
    color: '#151515',
    fontSize: rf(1.5),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginRight: rh(0.5),
  },
  verticalLine: {
    width: 1,
    height: rh(2.5),
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    marginRight: rh(0.5),
  },
  mobileInput: {
    color: '#151515',
    fontSize: rf(1.8),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '400',
    width: '100%',
  },
  mobileInput_port: {
    color: '#151515',
    fontSize: rf(1.5),
    fontWeight: '400',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    width: '100%',
  },
  mobileInput_tablet: {
    color: '#151515',
    fontSize: rf(1.3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '400',
    width: '100%',
  },
  passwordInput: {
    color: '#151515',
    fontSize: rf(1.8),
    fontWeight: '400',
    width: '80%',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  passwordInput_port: {
    color: '#151515',
    fontSize: rf(1.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '400',
    width: '80%',
  },
  passwordInput_tablet: {
    color: '#151515',
    fontSize: rf(1.3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '400',
    width: '80%',
  },

  passwordInputContainer: {
    borderColor: '#777',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rh(1),
    paddingHorizontal: rh(2),
    marginBottom: rh(2),
    height: isTabletPortrait ? rh(7) : rh(7),
  },
  eyeIcon: {
    width: rh(3),
    height: rh(3),
    marginLeft: 35,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: rh(2),
  },
  forgotPasswordText: {
    color: '#4789FC',
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(1.5),
  },
  signupButton: {
    backgroundColor: '#4789FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rh(2),
    marginTop: rh(3),
    borderRadius: rh(1),
    // padding: rh(1),
    height: isTabletPortrait ? rh(7) : rh(7),
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(2),
  },
  signupButtonText_tab: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: rf(1.7),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginContainer_keyboard: {
    display: 'none',
  },
  loginText: {
    color: '#00000061',
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(1.5),
  },
  loginLink: {
    color: '#4789FC',
    fontWeight: '500',
    fontSize: rf(1.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  logo: {
    width: rh(5),
    height: rh(5),
  },
  logo_tab: {
    width: rh(6),
    height: rh(6),
  },
  logo_port: {
    width: rh(5),
    height: rh(5),
  },
  subCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: rh(1),
    alignItems: 'center',
  },
  subCard_hidden: {
    display: 'none',
  },
  subCard_x: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: rh(1),
    marginTop: rh(1),
    alignItems: 'center',
  },
  validationContainer: {
    marginBottom: 10,
  },
  validationText: {
    fontSize: isTabletPortrait ? rf(1.3) : rf(1.4),
    marginBottom: 4,
    marginLeft: 5,
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: 'red',
    fontWeight: '400',
  },

  validationRow: {
    marginBottom: 4,
  },

  arrow: {
    width: rh(4),
    height: rh(4),
    marginBottom: rh(2),
  },
  arrow_tab: {
    width: rh(5),
    height: rh(5),
    marginBottom: rh(3),
  },

  hiddenMobileNumberInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    overflow: 'hidden',
  },

  headerText_tablet: {
    fontSize: rf(2),
    fontWeight: '500',
    color: '#151515',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginBottom: rh(2),
    textAlign: 'left',
  },
  instructionText: {
    fontSize: rf(1.9),
    color: '#00000059',
    marginBottom: rh(2),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    textAlign: 'left',
    fontWeight: '400',
    // marginRight: rw(10),
  },
  instructionText_port: {
    fontSize: rf(1.7),
    color: '#00000059',
    marginBottom: rh(2),
    textAlign: 'left',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '400',
    // marginRight: rw(10),
  },
  instructionText_tablet: {
    fontSize: rf(1.5),
    color: '#00000059',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    marginBottom: rh(2),
    textAlign: 'left',
    fontWeight: '400',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rh(2),
  },
  inputBox: {
    height: rh(5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    width: rh(5),
    borderWidth: 0.5,
    textAlign: 'center',
    fontSize: rf(1.9),
    borderRadius: rf(1),
    backgroundColor: '#fffff',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: rh(2),
  },
  inputBox_port: {
    height: rh(5),
    width: rh(5),
    borderWidth: 0.5,
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontSize: rf(1.9),
    borderRadius: rf(0.5),
    backgroundColor: '#F5F5F5',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: rh(2),
  },
  inputBox_tablet: {
    height: rh(7),
    width: rh(7),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    borderWidth: 0.1,
    textAlign: 'center',
    fontSize: rf(1.5),
    borderRadius: rf(0.5),
    backgroundColor: '#F5F5F5',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: rh(2),
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: rh(2),
  },
  resendButtonText: {
    color: '#4789FC',
    fontSize: rf(1.5),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
  },
  resendButtonText_tablet: {
    color: '#4789FC',
    fontSize: rf(1.3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4789FC',
    paddingVertical: rh(1.3),
    marginHorizontal: rh(2),
    borderRadius: rh(1),
    justifyContent: 'center',
    // height:  isTabletPortrait ? rh(7) : rh(5),
  },
  buttonText: {
    color: '#fff',
    fontSize: rf(2),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    textAlign: 'center',
  },
  buttonText_tablet: {
    color: '#fff',
    fontSize: rf(1.7),
    fontWeight: '500',
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    textAlign: 'center',
  },
  timer: {
    fontSize: rf(1.5),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: rh(2),
  },
  timer_tablet: {
    fontSize: rf(1.3),
    fontFamily: Platform.OS === 'android' ? 'satoshi' : 'System',
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: rh(2),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },

  focusedInput: {
    borderColor: '#4789fc', // Blue border when focused
    borderStyle: 'solid',
  },
  filledInput: {
    borderColor: '#4789fc', // Blue border when filled
  },

  codeFieldRoot: {
    height: CELL_SIZE,
    // marginTop: 30,
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    //  backgroundColor: 'blue',
    width: '100%',
  },
  cell: {
    // marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 1,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: rh(3),
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#4789fc',
    backgroundColor: '#fff',
    shadowColor: 'blue',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5.22,
    elevation: 3,
  },
});

export default Verification;