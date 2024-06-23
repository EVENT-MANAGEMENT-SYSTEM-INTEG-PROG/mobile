import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";

export default function AboutScreen() {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader
          title="Your Screen Title"
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.margintop}></View>
        <View style={styles.section}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTextYellow}>ABOUT </Text>
            <Text style={styles.headerTextWhite}>US</Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, vel dignissimos reiciendis ob voluptatem
            deserunt eaque voluptates...
          </Text>
          <Image
            source={require("../../../../assets/participants_images/AboutUs.jpg")}
            style={styles.sectionImage}
          />
        </View>
        <View style={styles.statsSection}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>5,000</Text>
            <Text style={styles.statLabel}>TOTAL EVENTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>500</Text>
            <Text style={styles.statLabel}>ANNUAL EVENTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>1,000</Text>
            <Text style={styles.statLabel}>VENUES</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerText}>WHAT WE OFFER?</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, vel dignissimos reiciendis ob voluptatem
            deserunt eaque voluptates...
          </Text>
          <Image
            source={require("../../../../assets/participants_images/WhatWeOffer.jpg")}
            style={styles.sectionImage}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.headerText}>WHO WE ARE?</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, vel dignissimos reiciendis ob voluptatem
            deserunt eaque voluptates...
          </Text>
          <Image
            source={require("../../../../assets/participants_images/WhoWeAre.jpg")}
            style={styles.sectionImage}
          />
        </View>
        <View style={styles.marginbot}></View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  section: {
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerTextYellow: {
    fontSize: 25,
    color: "#FFD700",
    fontWeight: "bold",
  },
  headerTextWhite: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 25,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  sectionImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#FFF",
    fontSize: 14,
  },
  screenContainer: {
    flex: 1,
    // Other styles for your screen container
  },
  marginbot: { marginBottom: 60 },
  margintop: { marginTop: 90 },
});
