import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegistrationScreen : React.FC<{navigation : any}> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Your Restaurant</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Pickup Timings" />
      <TextInput style={styles.input} placeholder="Bank Details" />
      <TextInput style={styles.input} placeholder="PAN Number" />
      <TextInput style={styles.input} placeholder="GST Number" />
      <Button title="Complete Registration" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default RegistrationScreen;
