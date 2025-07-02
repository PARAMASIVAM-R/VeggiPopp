import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OtpAndLocation from '../screens/auth/OtpAndLocation';
import LoginSignup from '../screens/auth/LoginSignup';

import HomeScreen from '../screens/appTabs/HomeScreen';
import ProfileScreen from '../screens/appTabs/ProfileScreen';
import SettingsScreen from '../screens/appTabs/SettingsScreen';
import SpO2Screen from '../screens/Graph/SpO2Screen';
import HeartRateScreen from '../screens/Graph/HeartRateScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (   
          <>                                                     
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="SpO2Screen" component={SpO2Screen} />
          <Stack.Screen name="HeartRateScreen" component={HeartRateScreen} />
         
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            <Stack.Screen name="OtpAndLocation" component={OtpAndLocation} />
            <Stack.Screen name="LoginSignup" component={LoginSignup} />
            
           
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
