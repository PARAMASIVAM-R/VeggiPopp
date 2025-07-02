import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../constants/colors';

import Avatar from '../../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/text/Header';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.scroll}>
      <Avatar uri="https://i.pravatar.cc/300" size={120} />
        {user ? (
        <>
          <Text style={styles.info}>Name: {user.name || 'Anonymous'}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.info}>Loading user...</Text>
      )}
      
      <CustomButton title="Logout" onPress={logout} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 25,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  scroll: {
    padding: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.black,
  },
});

export default ProfileScreen;
