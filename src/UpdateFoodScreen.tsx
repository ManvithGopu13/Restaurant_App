import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateFood } from '../Api/foodApi';

interface RouteParams {
    food: {
      _id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
      imageUrl: string;
    };
    refresh: () => void;
  }

const UpdateFoodScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { food, refresh } = route.params as RouteParams;

  const [name, setName] = useState(food.name);
  const [description, setDescription] = useState(food.description);
  const [price, setPrice] = useState(food.price.toString());
  const [quantity, setQuantity] = useState(food.quantity.toString());
  const [imageUrl, setImageUrl] = useState(food.imageUrl);

  const handleUpdate = async () => {
    const updatedData = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imageUrl,
    };

    try {
      await updateFood(food._id, updatedData);
      Alert.alert('Success', 'Food updated successfully!');
      refresh(); // Reload data on the home screen
      navigation.goBack(); // Navigate back to the home screen
    } catch (error) {
      Alert.alert('Error', 'Failed to update food');
      console.error('Error updating food:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Food</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default UpdateFoodScreen;
