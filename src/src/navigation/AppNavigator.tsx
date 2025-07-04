import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import OtpAndLocation from '../screens/auth/OtpAndLocation';
import LoginSignup from '../screens/auth/LoginSignup';

import ProductDetails from '../screens/appTabs/pages/ProductDetails';
import ItemDetails from '../screens/appTabs/pages/ItemDetails';
import SpO2Screen from '../screens/Graph/SpO2Screen';
import HeartRateScreen from '../screens/Graph/HeartRateScreen';

import AppTabs from './AppTabs';

import { ProductProvider } from '../context/ProductContext';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <ProductProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (   
          <>                                                     
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="SpO2Screen" component={SpO2Screen} />
          <Stack.Screen name="HeartRateScreen" component={HeartRateScreen} />
         
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="OtpAndLocation" component={OtpAndLocation} />
            <Stack.Screen name="LoginSignup" component={LoginSignup} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </ProductProvider>
  );
};

export default AppNavigator;
