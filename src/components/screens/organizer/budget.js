import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const initialExpenses = [
  { category: "Food & Catering", amount: "-50,000" },
  { category: "Venue: Church", amount: "-200,000" },
  { category: "Reception", amount: "-200,000" },
  { category: "Photography", amount: "-200,000" },
  { category: "Other Amenities", amount: "-200,000" },
];

const Budget = () => {
  const navigation = useNavigation(); 

  const [expenses, setExpenses] = useState(initialExpenses);
  const [budget, setBudget] = useState({
    left: "1,500,900",
    total: "2,500,000",
  });

  const handleExpenseChange = (index, value) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = value;
    setExpenses(newExpenses);
  };

  const handleBudgetChange = (field, value) => {
    setBudget({ ...budget, [field]: value });
  };

  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.budgetSection}>
          <Image
            style={styles.orgimage}
            source={require("../../../../assets/pic.png")}
          />
          <Text style={styles.eventTitle}>Mr. & Mrs. Malik Wedding</Text>
          <View style={styles.budgetInfo}>
            <Text style={styles.budgetText}>
              <Text style={styles.currency}>₱</Text>
              <TextInput
                style={styles.budgetInput}
                value={budget.left}
                onChangeText={(value) => handleBudgetChange("left", value)}
                keyboardType="numeric"
              />
            </Text>
            <Text style={styles.budgetDetails}>
              left out of
              <Text style={styles.currency}> ₱</Text>
              <TextInput
                style={styles.budgetInput}
                value={budget.total}
                onChangeText={(value) => handleBudgetChange("total", value)}
                keyboardType="numeric"
              />
            </Text>
          </View>
          <TouchableOpacity style={styles.newBudgetButton}>
            <Text style={styles.newBudgetButtonText}>Create New Budget</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Expenses</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
              <TextInput
                style={styles.expenseAmount}
                value={expense.amount}
                onChangeText={(value) => handleExpenseChange(index, value)}
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Status Overview</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusCategory}>Food & Catering</Text>
            <Text style={styles.statusDetails}>3,000 pax</Text>
            <Text style={styles.status}>Scheduled</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusCategory}>Photography</Text>
            <Text style={styles.statusDetails}></Text>
            <Text style={styles.status}>Scheduled</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Status Overview</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusCategory}>Food & Catering</Text>
            <Text style={styles.statusDetails}>3,000 pax</Text>
            <Text style={styles.status}>Scheduled</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusCategory}>Photography</Text>
            <Text style={styles.statusDetails}></Text>
            <Text style={styles.status}>Scheduled</Text>
          </View>
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
  header: {
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
    paddingHorizontal: 100,
  },
  scrollView: {
    marginBottom: 60,
  },
  budgetSection: {
    padding: 20,
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  budgetInfo: {
    alignItems: "center",
  },
  budgetText: {
    fontSize: 24,
    color: "#ff0",
  },
  budgetInput: {
    fontSize: 24,
    color: "#ff0",
    borderBottomWidth: 1,
    borderBottomColor: "#ff0",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  currency: {
    fontSize: 24,
  },
  budgetDetails: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
  newBudgetButton: {
    backgroundColor: "#ff0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  newBudgetButtonText: {
    color: "#000",
  },
  section: {
    backgroundColor: "#555",
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#ff0",
    fontSize: 16,
  },
  viewAll: {
    color: "#ff0",
    textDecorationLine: "underline",
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  expenseCategory: {
    color: "#fff",
    flex: 2,
  },
  expenseAmount: {
    color: "#fff",
    flex: 1,
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#777",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  statusCategory: {
    color: "#fff",
    flex: 1,
  },
  statusDetails: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  status: {
    color: "#fff",
    flex: 1,
    textAlign: "right",
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  orgimage: {
    alignItems: 'center',
    height: 130,
    width: 130,
    borderRadius: 150,
  },
});

export default Budget;