import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DropdownMenu = ({ onClose }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    onClose();
    navigation.navigate("Profile"); // Adjust route name as necessary
  };

  const handleNotificationPress = () => {
    onClose();
    navigation.navigate("Notification"); // Adjust route name as necessary
  };

  const handleEventDetailsPress = () => {
    onClose();
    navigation.navigate("Event Details"); // Adjust route name as necessary
  };

  const handleBudgetPress = () => {
    onClose();
    navigation.navigate("Budget"); // Adjust route name as necessary
  };

  const handleEventPortfolioPress = () => {
    onClose();
    navigation.navigate("Event Portfolio"); // Adjust route name as necessary
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleProfilePress}>
        <Icon name="person" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleNotificationPress}>
        <Icon name="notifications" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleEventDetailsPress}>
        <Icon name="event" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Event Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleBudgetPress}>
        <Icon name="attach-money" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={handleEventPortfolioPress}
      >
        <Icon name="work" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Event Portfolio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 52,
    right: 10,
    backgroundColor: "#000", // Set background color to black
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    zIndex: 1000,
    borderWidth: 1, // Add border width
    borderColor: "#fff", // Set border color to white
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
    color: "#fff", // Set icon color to white
  },
  text: {
    fontSize: 16,
    color: "#fff", // Set text color to white
  },
});

export default DropdownMenu;
