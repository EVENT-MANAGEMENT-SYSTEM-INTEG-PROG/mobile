import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the burger icon
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 20, status: "Complete" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 20, status: "Missing" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 20, status: "Broken" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 20, status: "Broken" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 20, status: "Missing" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 20, status: "Complete" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Complete":
      return { color: "green" };
    case "Missing":
      return { color: "orange" };
    case "Broken":
      return { color: "red" };
    default:
      return { color: "white" };
  }
};

const Inventory = () => {
  const navigation = useNavigation(); // Hook to use navigation

  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}> </Text>
      <Text style={styles.text}> </Text>
      <NavBar />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>
            <Text style={styles.headerHighlight}>Inventory</Text> Tracker
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF SORT ITEMS</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
          </View>
          {inventoryData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <Text style={styles.tableRowText}>{item.noOfSortItems}</Text>
              <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
          <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
        </View>
      </ScrollView>
      <NavBar />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  headerSection: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#444",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerHighlight: {
    backgroundColor: "#ff0",
    color: "#000",
    paddingHorizontal: 5,
  },
  table: {
    margin: 20,
    padding: 10,
    backgroundColor: "#555",
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
  },
  tableHeaderText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  summary: {
    margin: 20,
    padding: 10,
    backgroundColor: "#666",
    borderRadius: 10,
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
});

export default Inventory;