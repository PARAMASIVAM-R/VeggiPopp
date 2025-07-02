import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/text/Header';
import Card from '../../components/Card';

import { useTheme } from '../../context/ThemeContext';


import globalStyles from '../../styles/global';
import layoutStyles from '../../styles/layout';
import { useNavigation } from '@react-navigation/native';
import SpO2Screen from '../Graph/SpO2Screen';
import HeartRateScreen from '../Graph/HeartRateScreen';

const HomeScreen = () => {
    const { colors } = useTheme();
     const navigation = useNavigation();
    
  return (
    // <View style={styles.container}>
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Home" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card title="News" description="Latest updates from our app" />
        <Card title="Notice" description="Tomorrow will be holiday." />
        <Card title="Notice" description="Tomorrow will be holiday." />
        
        <View style={[globalStyles.container, layoutStyles.center]}>
          <Text style={globalStyles.textTitle}>Welcome Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HeartRateScreen')}>
            <Text style={globalStyles.textNormal}>This is the Home screen.</Text>
          </TouchableOpacity>
        </View>
 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scroll: {
    padding: 20,
  },
});

export default HomeScreen;
