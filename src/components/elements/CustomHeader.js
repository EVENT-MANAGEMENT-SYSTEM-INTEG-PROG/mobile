import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropdownMenu from "./DropdownMenu";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({ onBackPress, showBackButton }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFC42B" />
        </TouchableOpacity>
      )}
      <Image
        source={require("../../../assets/participants_images/eventwise.png")} // Adjust the path if necessary
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={toggleDropdown} style={styles.profileButton}>
        <Icon name="person" size={24} color="white" />
      </TouchableOpacity>
      {showDropdown && <DropdownMenu onClose={() => setShowDropdown(false)} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 15,
    zIndex: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  backButton: {
    position: "absolute",
    marginTop: 35,
    left: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  logo: {
    marginTop: 10,
    marginLeft: "auto", // Automatically adjust left margin
    // Add some space to the right
    width: "40%",
    height: "100%",
    resizeMode: "contain",
  },
  profileButton: {
    marginLeft: "auto", // Automatically adjust left margin
    padding: 10,
  },
});

export default CustomHeader;
