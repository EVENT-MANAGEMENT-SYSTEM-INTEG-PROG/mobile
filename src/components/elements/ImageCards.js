import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// COMMENT:
// Mao ni tung sa EventScreen na naay mga clickable event types

const images = [
  require("../../../assets/participants_images/birthdaycard.png"),
  require("../../../assets/participants_images/summitscard.png"),
  require("../../../assets/participants_images/reunioncard.png"),
  require("../../../assets/participants_images/concertscard.png"),
  require("../../../assets/participants_images/festivalcard.png"),
  require("../../../assets/participants_images/weddingcard.png"),
];

const ImageCards = () => {
  const navigation = useNavigation();

  const handleCardPress = (screenName, params) => {
    navigation.navigate(screenName, params); // Navigate to the specified screen
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleCardPress(getEventType(index), { id: index })}
        >
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getEventType = (index) => {
  // Logic to determine the event type based on the index
  // You can customize this based on your data
  const eventTypes = [
    "Birthday",
    "Summit",
    "Reunion",
    "Concert",
    "Festival",
    "Wedding",
  ];
  return eventTypes[index];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 70,
  },
  card: {
    margin: 1,
    width: "40%",
    height: 190,
  },
  image: {
    width: "100%", // Make the image take up the full width of the card
    height: "100%", // Set the height as needed
    resizeMode: "contain", // Adjust the resize mode as needed
  },
});

export default ImageCards;
