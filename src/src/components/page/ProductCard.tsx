import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Header from '../text/Header';
import Description from '../text/Description';
import CustomButton from '../Button/CustomButton';
import IconButton from '../image/IconButton';

interface ProductCardProps {
  item: any;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <IconButton
        icon={require('../../assets/images/logo.png')}
        onPress={() => console.log('Tapped!')}
        width={100}
        height={70}
        borderRadius={10}
        backgroundColor="transparent"
        disabled={true}
        opacity={1}
        align="center"
        //   alignmentStyles={{ justifyContent: 'center' }}
        containerStyle={{marginTop: 20}}
      />
      <Header
        title={item.name}
        color="#000"
        size={15}
        alignItems="left"
        textAlign="left"
        backgroundColor="#fcfcfc"
        paddingVertical={10}
        paddingHorizontal={0}
      />
      <Description
        title={`${item.price}/unit`}
        color="#000"
        size={16}
        align="left"
        paddingVertical={0}
        paddingHorizontal={0}
        fontWeight={800}
      />

      <CustomButton
        title="+"
        onPress={() => {}}
        backgroundColor="#53B175"
        borderRadius="50%"
        fontSize={26}
        align="right"
        width={40}
        paddingVertical={4}
        disabled={false}
        style={{margin: 0, bottom: 0, marginRight: 10, position: 'absolute'}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    elevation: 2,
    width: '48%', // full width of parent (FlatList item)
  },
});

export default ProductCard;
