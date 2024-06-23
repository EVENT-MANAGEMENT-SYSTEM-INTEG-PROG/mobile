import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";

const services = [
  {
    title: "PHOTO AND VIDEO SERVICES",
    description:
      "Lorem ipsum dolor sit amet, vel dignissim... nostrud exercitation ullamco.",
    image: require("../../../../assets/participants_images/PhotoAndVidServices.jpg"), // replace with your actual image
  },
  {
    title: "DÉCOR AND EVENT PRODUCTION",
    description:
      "Lorem ipsum dolor sit amet, vel dignissim... nostrud exercitation ullamco.",
    image: require("../../../../assets/participants_images/DecorAndEventProduct.jpg"), // replace with your actual image
  },
  {
    title: "FOOD AND BEVERAGES",
    description:
      "Lorem ipsum dolor sit amet, vel dignissim... nostrud exercitation ullamco.",
    image: require("../../../../assets/participants_images/FoodAndBeverage.webp"), // replace with your actual image
  },
  {
    title: "AUDIOVISUAL, LIGHTS AND SOUND RENTAL",
    description:
      "Lorem ipsum dolor sit amet, vel dignissim... nostrud exercitation ullamco.",
    image: require("../../../../assets/participants_images/LightsAndSoundRental.jpg"), // fix extension typo
  },
];

const ServicesScreen = () => {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTextYellow}>SERVICES </Text>
          <Text style={styles.headerTextWhite}>OFFERED</Text>
        </View>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceContainer}>
            <Image source={service.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>
          </View>
        ))}
        <View style={styles.marginbot}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  headerTextYellow: {
    color: "#f0a500",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTextWhite: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  serviceContainer: {
    flexDirection: "row",
    margin: 15,
    padding: 13,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: "#f0a500",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  screenContainer: {
    flex: 1,
    // Other styles for your screen container
  },
  marginbot: { marginBottom: 80 },
});

export default ServicesScreen;
