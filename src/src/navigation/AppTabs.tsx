import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

// ---- Screens
import Shop from '../screens/appTabs/Shop';
import Explore from '../screens/appTabs/Explore';
import Cart from '../screens/appTabs/Cart';
import Favourite from '../screens/appTabs/Favourite';
import Account from '../screens/appTabs/Account';

import componentTest from '../allComponents/screen/componentTest';

const Tab = createBottomTabNavigator();

// ---- Tab Icon Component
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
        { tintColor: focused ? 'rgba(83, 177, 117, 1)' : 'rgba(24, 23, 37, 1)' },
      ]}
    />
  );
};

// ---- Tabs
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons: Record<
            string,
            { filled: any; outline: any }
          > = {
            Shop: {
              filled: require('../assets/taps/shope-filled.png'),
              outline: require('../assets/taps/shop-outline.png'),
            },
            Explore: {
              filled: require('../assets/taps/explore-filled.png'),
              outline: require('../assets/taps/explore-outline.png'),
            },
            Cart: {
              filled: require('../assets/taps/cart-filled.png'),
              outline: require('../assets/taps/cart-outline.png'),
            },
            Favourite: {
              filled: require('../assets/taps/favourite-filled.png'),
              outline: require('../assets/taps/favourite-outline.png'),
            },
            Account: {
              filled: require('../assets/taps/account-filled.png'),
              outline: require('../assets/taps/account-outline.png'),
            },
          };

          const { filled, outline } = icons[route.name];

          return <TabIcon focused={focused} filledIcon={filled} outlineIcon={outline} />;
        },
        tabBarActiveTintColor: 'rgba(83, 177, 117, 1)',
        tabBarInactiveTintColor: 'rgba(24, 23, 37, 1)',
      })}
    >
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favourite" component={componentTest} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default AppTabs;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});










