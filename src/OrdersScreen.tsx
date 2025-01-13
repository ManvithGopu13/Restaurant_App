import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import { fetchOrders, deleteOrder , updateOrder } from '../Api/foodApi'; // Import necessary functions
import { ScrollView } from 'react-native-gesture-handler';

interface Order {
  _id: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  transactionId: string;
  user: { name: string; email: string };
  otp: number;
  delivered : boolean;
}

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [otp, setOtp] = useState('');

  // Fetch orders from the database
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    loadOrders();
  }, []);

  // Handle order delivery
  const handleDelivered = async (orderId: string, orderUpdated: Order) => {
    try {
    //   await deleteOrder(orderId); // Call the API to delete the order
      updateOrder(orderId, orderUpdated)
    //   setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Alert.alert('Success', 'Order marked as delivered.');
    } catch (error) {
      console.error('Error deleting order:', error);
      Alert.alert('Error', 'Failed to mark order as delivered.');
    }
  };

  const renderOrderCard = ({ item }: { item: Order }) => (
    <>
        {item.delivered == false && (
            <> 
            <View style={styles.card}>
                    <Text style={styles.cardTitle}>Order ID: {item._id}</Text>
                    <Text style={styles.cardText}>Customer: {item.user.name}</Text>
                    <Text style={styles.cardText}>Email: {item.user.email}</Text>
                    <Text style={styles.cardText}>Transaction ID: {item.transactionId}</Text>
                    <Text style={styles.cardText}>Total Amount: ${item.totalAmount.toFixed(2)}</Text>
          
                    <Text style={styles.cardText}>Items:</Text>
                    {item.items.map((item, index) => (
                      <Text key={index} style={styles.itemText}>
                        - {item.name} x{item.quantity}
                      </Text>
                    ))}
                    {item.delivered == false && (
                      <>
                      <TextInput
                        style={styles.otpInput}
                        placeholder="Enter OTP"
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={(text) => setOtp(text)}
                      />
                      <TouchableOpacity
                        style={styles.deliveredButton}
                        onPress={() => {
                          if (otp === item.otp.toString()) {
                            const updatedOrder_1 = item
                            updatedOrder_1.delivered = true
                            handleDelivered(item._id, updatedOrder_1);
                        } else {
                          Alert.alert('Invalid OTP. Please try again.');
                        }
                      }    
                        }
                      >
                        <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
                      </TouchableOpacity>
                      </>
                        
                    ) }
    </View>
            </>
        )}
    </>
        
  );

  const renderDeliveredCard = ({ item }: { item: Order }) => (

    <>
        {item.delivered == true && (
            <>
                <View style={styles.card}>
                <Text style={styles.cardTitle}>Order ID: {item._id}</Text>
                <Text style={styles.cardText}>Customer: {item.user.name}</Text>
                <Text style={styles.cardText}>Email: {item.user.email}</Text>
                <Text style={styles.cardText}>Transaction ID: {item.transactionId}</Text>
                <Text style={styles.cardText}>Total Amount: ${item.totalAmount.toFixed(2)}</Text>
                <Text style={styles.cardTitle}>OTP: {item.otp}</Text>
                <Text style={styles.cardText}>Items:</Text>
                {item.items.map((item, index) => (
                  <Text key={index} style={styles.itemText}>
                    - {item.name} x{item.quantity}
                  </Text>
                ))}
                {/* {item.delivered == false && (
                      <TouchableOpacity
                      style={styles.deliveredButton}
                      onPress={() => {
                          const updatedOrder_1 = item
                          updatedOrder_1.delivered = true
                          handleDelivered(item._id, updatedOrder_1);
                    }    
                      }
                    >
                      <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
                    </TouchableOpacity>
                ) } */}
                </View>
            </>
        )}
    </>
    
);

  return (
    <View style={styles.container}>

        <View style = {styles.undeliveredSection}>
        <Text style={styles.header}>Live Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No live orders available.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderCard}
        />
      )}
        </View>

        <View style = {styles.deliveredSection}>
        <Text style={styles.header}>Delivered Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No live orders available.</Text>
      ) : (
        <FlatList
        horizontal
      showsHorizontalScrollIndicator={false}
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderDeliveredCard}
        />
      )}

        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  otpInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  deliveredSection: {
    backgroundColor: '#fff',
    elevation : 5,
    padding: 10,
    marginBottom: 20,
    borderRadius: 30
  },
  undeliveredSection: {
    backgroundColor: '#fff',
    elevation : 5,
    padding: 10,
    marginBottom: 20,
    borderRadius: 30
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    marginBottom: 16,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 10
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardText: { fontSize: 14, marginBottom: 4 },
  itemText: { fontSize: 14, marginLeft: 8 },
  deliveredButton: {
    marginTop: 16,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deliveredButtonText: { color: '#fff', fontWeight: 'bold' },
  noOrdersText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#666' },
});

export default OrdersScreen;



