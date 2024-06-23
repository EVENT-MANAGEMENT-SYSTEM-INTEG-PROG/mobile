// screens/BudgetOverview.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const Budgeting = ({ navigation }) => {
  const [budget, setBudget] = useState(20000);
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      description: "FUNCTION HALL 1",
      date: "10.03.26",
      amount: 10000,
    },
    { id: "2", description: "CATERING", date: "10.03.26", amount: 5000 },
    { id: "3", description: "######", date: "10.03.26", amount: 2000 },
    { id: "4", description: "# ######", date: "10.03.26", amount: 2000 },
  ]);

  const updateTransactionAmount = (id, newAmount) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, amount: newAmount }
          : transaction
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.transactionText}>{item.description}</Text>
      <Text style={styles.transactionText}>{item.date}</Text>
      <TextInput
        style={styles.amountInput}
        value={String(item.amount)}
        onChangeText={(text) => updateTransactionAmount(item.id, Number(text))}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/material-outlined/24/ffffff/menu--v3.png",
          }}
          style={styles.menuIcon}
        />
        <Text style={styles.navBarText}>
          <Text style={styles.navBarTextBold}>Event</Text>Wise
        </Text>
        <Image
          source={{
            uri: "https://img.icons8.com/material-outlined/24/ffffff/user--v1.png",
          }}
          style={styles.userIcon}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Budgeting Overview</Text>
        <Image
          source={require("../pictures/piggy.png")} // Update this path if
          style={styles.image}
        />

        <Text style={styles.balanceLabel}>CURRENT BALANCE:</Text>
        <Text style={styles.balance}>₱{budget.toLocaleString()}</Text>
        <TextInput
          style={styles.input}
          value={String(budget)}
          onChangeText={(text) => setBudget(Number(text))}
          keyboardType="numeric"
        />
        <Button
          title="Add to Your Budget"
          onPress={() => setBudget(budget + 20000)}
        />
        <View style={styles.transactions}>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateEventPortfolio")}
        >
          <Text style={styles.buttonText}>Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  navBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  image: {
    width: 200,
    height: 200,
  },
  navBarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "normal",
  },
  navBarTextBold: {
    color: "#FFC700",
    fontWeight: "bold",
  },
  userIcon: {
    width: 24,
    height: 24,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  balanceLabel: {
    color: "#FFF",
    fontSize: 16,
    marginVertical: 5,
  },
  balance: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "#FFF",
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#333",
  },
  transactions: {
    width: "100%",
    marginVertical: 20,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  transactionText: {
    color: "#FFF",
  },
  amountInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "#FFF",
    width: 80,
    paddingHorizontal: 10,
    backgroundColor: "#333",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Budgeting;
