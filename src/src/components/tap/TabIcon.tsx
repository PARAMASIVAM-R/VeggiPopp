
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface TabIconProps {
  focused: boolean;
  filledIcon: any;
  outlineIcon: any;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, filledIcon, outlineIcon }) => {
  return (
    <Image
      source={focused ? filledIcon : outlineIcon}
      style={[
        styles.icon,
        { tintColor: focused ? 'rgba(83, 177, 117, 1)' : 'rgba(24, 23, 37, 1)' }, // Optional if your image supports tinting
      ]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default TabIcon;




/*
 **************************************************
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import TabIcon from './components/TabIcon';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons = {
            Home: {
              filled: require('./assets/icons/home-filled.png'),
              outline: require('./assets/icons/home-outline.png'),
            },
            Profile: {
              filled: require('./assets/icons/profile-filled.png'),
              outline: require('./assets/icons/profile-outline.png'),
            },
            Settings: {
              filled: require('./assets/icons/settings-filled.png'),
              outline: require('./assets/icons/settings-outline.png'),
            },
          };

          const { filled, outline } = icons[route.name];

          return <TabIcon focused={focused} filledIcon={filled} outlineIcon={outline} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
 
 ************************************************** 
 */
