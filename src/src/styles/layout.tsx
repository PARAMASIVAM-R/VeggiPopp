
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap:'wrap',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  rowSpaceEvenly: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
    backgroundColor:'red',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacedBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
});



/*
******************************************************
import commonStyles from '../styles/commonStyles'; // adjust the path as needed

const NextPage = () => {
  return (
    <View style={commonStyles.center}>
      <Text>Hello from Next Page!</Text>
    </View>
  );
};

******************************************************
*/