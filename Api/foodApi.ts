import axios from 'axios';

const BASE_URL = 'http://172.20.10.3:5000';

// Define the type for food data
interface FoodData {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export const fetchFoods = async (): Promise<FoodData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/res_foods`); // No changes here, BASE_URL includes `/api/res_foods`
      return response.data as FoodData[];
    } catch (error) {
      console.error('Error fetching foods:', error);
      return [];
    }
  };
  
  export const addFood = async (foodData: Omit<FoodData, '_id'>): Promise<FoodData> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/res_foods`, foodData);
      return response.data as FoodData;
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  };
  
  
  export const deleteFood = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/api/res_foods/${id}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  };
  
  export const updateFood = async (id: string, updatedData: Omit<FoodData, '_id'>): Promise<FoodData> => {
    try {
      const response = await axios.put(`${BASE_URL}/api/res_foods/${id}`, updatedData);
      return response.data as FoodData;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  };

  interface Order {
    _id: string;
    items: { name: string; quantity: number }[];
    totalAmount: number;
    transactionId: string;
    user: { name: string; email: string };
    otp: number;
    delivered : boolean;
  }
  
  export const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  export const updateOrder = async (id: string, updatedOrder: Order) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/${id}`, updatedOrder);
      return response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  };

  // Delete Order API
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/orders/${orderId}`);
    console.log('Order deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
