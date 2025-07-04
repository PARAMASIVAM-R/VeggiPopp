// Explore.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../../context/ProductContext';

const Explore = () => {
  const { products } = useContext(ProductContext)!;
  const navigation = useNavigation();

  // Mapping of categories to local asset files
  const categoryImages = {
    'beverages':   require('../../assets/explore/beverages.png'),
    'cookingOil': require('../../assets/explore/cookingOil.png'),
    'fish':       require('../../assets/explore/meat.png'),
    'vegetables':  require('../../assets/explore/vegetable.png'),
    'fruits':      require('../../assets/explore/fruits.png'),
    'meat':       require('../../assets/explore/meat.png')
  };

  const renderCategory = ({ item }: { item: [string, any[]] }) => {
    const [category] = item;
    const imageSource = categoryImages[category] ||require('../../assets/images/google.png'); // Fallback image

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { category })}
        style={styles.categoryCard}
      >
        <Image
          source={imageSource}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(products)}
        renderItem={renderCategory}
        keyExtractor={([category]) => category}
        numColumns={2} // Two columns for grid layout
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  categoryCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f0e8f0',
    borderRadius: 10,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
  },
  categoryImage: { width: 50, height: 50, resizeMode: 'contain' },
  categoryText: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
  row: { justifyContent: 'space-between' },
  listContent: { paddingBottom: 20 },
});

export default Explore;