import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabIcon from '../components/tap/TabIcon';

//----below imports are all for components screen
import Shop from '../screens/appTabs/Shop';
import Explore from '../screens/appTabs/Explore';
import Cart from '../screens/appTabs/Cart';
import Favourite from '../screens/appTabs/Favourite';
import Account from '../screens/appTabs/Account';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons = {
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
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default AppTabs;
