// ItemDetails.tsx
import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProductContext } from '../../../context/ProductContext';

const ItemDetails = () => {
  const { params } = useRoute<any>();
  const { category, itemId } = params;
  const { products, addToBasket } = useContext(ProductContext)!;
  const navigation = useNavigation();
  const item = products[category].find(i => i.id === itemId)!;
  const [quantity, setQuantity] = useState(item.quantity);

  const handleAddToBasket = () => {
    const updatedItem = { ...item, quantity };
    addToBasket(updatedItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(0, quantity - 1))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.section}>Product Detail</Text>
      <Text>{item.details}</Text>
      <Text style={styles.section}>Nutritions</Text>
      <Text>{item.nutrition}</Text>
      <Text style={styles.section}>Review</Text>
      <Text>{item.review}</Text>
      <View style={styles.rating}>
        {'★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToBasket} disabled={quantity === 0}>
        <Text style={styles.addButtonText}>Add to Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, alignItems: 'center' },
  itemImage: { width: 200, height: 200, resizeMode: 'contain' },
  itemName: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantity: { fontSize: 18, paddingHorizontal: 15 },
  price: { fontSize: 18, color: '#000', marginVertical: 10 },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  rating: { marginVertical: 10 },
  addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, width: '80%', marginTop: 20 },
  addButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default ItemDetails;