import React, { useContext } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

import { ThemeProvider } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
  <AuthProvider>
    <ThemeProvider>
      {/* <NavigationContainer> */}
        <AppNavigator />
      {/* </NavigationContainer> */}
    </ThemeProvider>
  </AuthProvider>
  );
};

export default App;
