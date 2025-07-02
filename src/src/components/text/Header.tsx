// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import colors from '../constants/colors';

// const Header = ({ title }) => (
//   <View style={styles.header}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   header: {
//     paddingVertical: 20,
//     backgroundColor: colors.primary,
//     alignItems: 'center',
//   },
//   title: {
//     color: colors.white,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default Header;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const Header = ({
  title,
  color = colors.white,
  size = 10,
  alignItems = 'center',
  textAlign = 'left',
  backgroundColor = colors.primary,
  paddingVertical = 0,
  paddingHorizontal = 10,
}) => (
  <View style={[styles.header, {backgroundColor, alignItems: alignItems, paddingVertical:paddingVertical, paddingHorizontal:paddingHorizontal}]}>
    <Text style={[styles.title, {color, fontSize: size, textAlign: textAlign}]}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    // paddingVertical: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Header;

/*
*************************************************************** 
<Header title="Welcome" />  // Default styles

<Header
  title="Dashboard"
  color="yellow"
  size={25}
  alignItems="center"
  textAlign ='left'
  backgroundColor="black"
/> 
**************************************************************
*/
