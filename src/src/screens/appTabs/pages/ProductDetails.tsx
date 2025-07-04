import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProductContext } from '../../../context/ProductContext';
import ProductCard from '../../../components/page/ProductCard'; // adjust path as needed
import IconButton from '../../../components/image/IconButton';
import Header from '../../../components/text/Header';
import commonlayout from '../../../styles/layout';

const ProductDetails = () => {
  const { params } = useRoute<any>();
  const { category } = params;
  const { products, updateQuantity } = useContext(ProductContext)!;
  const navigation = useNavigation();

  const handlePress = (item: any) => {
    updateQuantity(category, item.id, 1);
    navigation.navigate('ItemDetails', { category, itemId: item.id });
  };

  return (
    <View style={styles.container}>
      <View style={commonlayout.rowSpaceBetween}>
         <IconButton
          icon={require('../../../assets/images/backArrow.png')}
          onPress={() => navigation.goBack()}
          width={23}
          height={23}
          borderRadius={0}
          align="left"
          backgroundColor="transparent"
          containerStyle={{ margin: 0, }}
        />

        <Header
          title={category.charAt(0).toUpperCase() + category.slice(1)}
          color="black"
          size={24}
          alignItems="center"
          textAlign=" center"
          backgroundColor="tranparent"
          width='70%'
          paddingHorizontal={0}
        />
        <View></View>
        <View></View>
      </View>

      <FlatList
        data={products[category]}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={item => item.id}
        numColumns={2} // Two columns for grid layout
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { justifyContent: 'space-between' },
  listContent: { paddingBottom: 20 },
});

export default ProductDetails;
