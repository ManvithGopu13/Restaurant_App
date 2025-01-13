import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { fetchFoods, addFood, deleteFood } from '../Api/foodApi';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the type for your stack navigator
type RootStackParamList = {
  HomeScreen: undefined; // No params for HomeScreen
  UpdateFoodScreen: {
    food: {
      _id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
      imageUrl: string;
    };
    refresh: () => Promise<void>;
  };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface FoodData {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

const HomeScreen = () => {
  const [foodItems, setFoodItems] = useState<FoodData[]>([]);
  const [newFood, setNewFood] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const loadFoods = async () => {
    const data = await fetchFoods();
    setFoodItems(data);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleAddFood = async () => {
    if (newFood.trim()) {
      try {
        const foodData: FoodData = {
          _id: '', // Backend will generate this
          name: newFood,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity, 10),
          imageUrl: 'https://yeyfood.com/wp-content/uploads/2024/08/WEB1indian_chicken_biryani._served_on_a_white_plate._s_77c8f1ca-f01e-4a4d-9f2c-61bce785c1d7_3-735x735.jpg',
        };
        await addFood(foodData);
        loadFoods();
        setNewFood('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImageUrl('')
      } catch (error) {
        Alert.alert('Error', 'Failed to add food');
      }
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      await deleteFood(id);
      loadFoods();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete food');
    }
  };

  const navigateToUpdateScreen = (item : any) => {
    navigation.navigate('UpdateFoodScreen', { food: item, refresh: loadFoods });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <TextInput style={styles.input} placeholder="Food Name" value={newFood} onChangeText={setNewFood} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="ImageUrl" value={imageUrl} onChangeText={setImageUrl} />
      <Button title="Add Food" onPress={handleAddFood} />
      
      <Text style={styles.header}>Display of Items</Text>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
        data={foodItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
           <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.name}>{item.quantity}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Button title="Edit" onPress={() => navigateToUpdateScreen(item)} />
            <Button title="Delete" onPress={() => handleDeleteFood(item._id)} />
          </View>
        )}
      />
      <Text style={styles.header}>End of Items</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  description: { color: '#777' },
  price: { color: 'green', fontWeight: 'bold', marginTop: 5 },
  image: {
    height: 120,
    width: '100%',
  },
  card: {
    width: 250,
    height: 300,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    elevation: 5,
    padding: 10,
    marginTop: 10
  },
});

export default HomeScreen;
