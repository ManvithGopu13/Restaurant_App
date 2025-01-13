import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LoginScreen from './src/Login';
import RegistrationScreen from './src/Registration';
import HomeScreen from './src/HomeScreen';
import OrdersScreen from './src/OrdersScreen';
import SalesScreen from './src/Sales';
import UpdateFoodScreen from './src/UpdateFoodScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Orders') {
        iconName = 'cart';
      } else if (route.name === 'Sales') {
        iconName = 'stats-chart';
      }

      // Return the icon component
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'green', // Active icon color
    tabBarInactiveTintColor: 'black', // Inactive icon color
    tabBarStyle: {
      height: 60,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: 10,
    },
    tabBarButton: (props) => (
      <Pressable
        {...props}
        android_ripple={{ color: 'transparent' }}
        style={({ pressed }) => [
          { flex: 1, alignItems: 'center', justifyContent: 'center' },
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <View style={{ alignItems: 'center' }}>{props.children}</View>
      </Pressable>
    ),
  })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Sales" component={SalesScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Food List' }} />
        <Stack.Screen
          name="UpdateFoodScreen"
          component={UpdateFoodScreen}
          options={{ title: 'Update Food' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
