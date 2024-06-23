import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const festivals = [
  {
    name: "Angela's Birthday",
    date: "11 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
  {
    name: "Angelo's Birthday",
    date: "12 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
  {
    name: "Angeline's Birthday",
    date: "13 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
  {
    name: "Angelita's Birthday",
    date: "18 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
  {
    name: "Angelito's Birthday",
    date: "21 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
  {
    name: "Angel's Birthday",
    date: "10 Aug 2024",
    image: require("../../../assets/participants_images/bday.jpg"),
  },
];

const FestivalCard = ({ name, date, image }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    // Navigate to the selected event screen with props
    navigation.navigate("SelectedEvent", { name, date, image });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const Cards = () => {
  return (
    <View style={styles.container}>
      {festivals.map((festival) => (
        <FestivalCard
          key={festival.name}
          name={festival.name}
          date={festival.date}
          image={festival.image}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "45%",
    height: 170,
    marginBottom: 25,

    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
    paddingTop: 5,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
});

export default Cards;
