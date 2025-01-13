import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const SalesScreen = () => {
  const [data, setData] = useState([50, 75, 100, 80, 90, 100, 25]);
  const [labels, setLabels] = useState(['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5','Jan 6', 'Jan 7']);

  const itemSales = [
    { name: 'Pizza', population: 20, color: '#ff9800', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Burger', population: 25, color: '#2196f3', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Pasta', population: 20, color: '#4caf50', legendFontColor: '#000', legendFontSize: 12 },
    { name: 'Salad', population: 15, color: '#f44336', legendFontColor: '#000', legendFontSize: 12 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sales Dashboard</Text>

      {/* Daily Sales Graph */}
      <Text style={styles.subHeader}>Daily Orders Processed</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: data }],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Item Sales Breakdown */}
      <Text style={styles.subHeader}>Item-Wise Sales Breakdown</Text>
      <PieChart
        data={itemSales}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4caf50',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#000',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default SalesScreen;
