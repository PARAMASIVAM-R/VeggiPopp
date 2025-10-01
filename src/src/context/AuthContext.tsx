import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const checkLogin = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      login(); // Set isLoggedIn to true
    }
  };
  checkLogin();
}, []);




const login = async () => {
  try {
    await AsyncStorage.setItem('token', 'dummy-token');
    setUserToken('dummy-token');
  } catch (err) {
    console.error('Login failed', err);
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    setUserToken(null);
  } catch (err) {
    console.error('Logout failed', err);
  }
};

const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    setUserToken(token);
    setLoading(false);
  } catch (e) {
    console.error('Failed to load token');
    setLoading(false);
  }
};

useEffect(() => {
  loadToken();
}, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};