import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Carousel from "pinar";

const images = [
  {
    name: "festival",
    img: require("../../../assets/participants_images/festival.png"),
    text: "Celebrate your community’s festival!",
  },
  {
    name: "concert",
    img: require("../../../assets/participants_images/concert.jpg"),
    text: "Join fantastic concerts",
  },
  {
    name: "wedding",
    img: require("../../../assets/participants_images/wedding.jpg"),
    text: "Organize your beautiful wedding",
  },
];

export default function CarouselView() {
  return (
    <View style={styles.carouselContainer}>
      <Carousel autoplay autoplayInterval={3000} loop>
        {images.map((img) => (
          <View style={styles.slide} key={img.name}>
            <Image style={styles.image} source={img.img} />
            <Text style={styles.text}>{img.text}</Text>
          </View>
        ))}
      </Carousel>
    </View>
  );
}
const styles = StyleSheet.create({
  image: { height: "100%", width: "100%", borderRadius: 20 },
  carouselContainer: { height: 200, width: "100%", marginBottom: 20 }, // Set a fixed height for the container
  carousel: { height: "100%", width: "100%" },
  slide: { width: "100%", height: "100%" },
  text: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, .50)",
    padding: 5,
    borderRadius: 5,
    fontWeight: "500",
  },
});
