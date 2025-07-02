import React from 'react';
import {View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import Description from '../../components/text/Description';
import Header from '../../components/text/Header';
import CustomButton from '../../components/Button/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
    <SafeAreaView/>
    <ImageBackground
      source={require('../../assets/images/welcome.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        
        <Header
          title={`Welcome \nto our store`}
          color="white"
          size={40}
          alignItems="center"
          textAlign="center"
          backgroundColor="transparent"
          paddingHorizontal={0}
          paddingVertical={0}
        />

        <Description
          title="Get your groceries in as fast as one hour"
          color="#ccc"
          size={16}
          align="center"
          paddingHorizontal={0}
          paddingVertical={10}
        />

        <CustomButton
          title="Get Started"
          onPress={() => { navigation.navigate('SignInScreen')}}
          backgroundColor="#53B175"
          borderRadius={10}
          fontSize={20}
          align="center"
          width="75%"
          paddingVertical={13}
          disabled={false}
          style={{marginTop:10}}
        />
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // optional dim effect

    flex: 1,
    paddingTop: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
