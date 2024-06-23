import { View, Text, ScrollView, StyleSheet,Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ScrollViewScreens() {
  return (
    <ScrollView horizontal style={styles.eventsContainer}>
      {events.map((event, index) => (
        <View key={index} style={styles.eventCard}>
          <View style={styles.eventImageContainer}>
            <Image source={event.image} style={styles.eventImage} />
            <TouchableOpacity style={styles.addEventButton}>
              <Text style={styles.addEventButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>{event.date}</Text>
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const events = [
  {
    image: require("../../../assets/participants_images/wedding.jpg"),
    title: "Mr. & Mrs. Malik Wedding",
    date: "23 Sept, 23",
    location: "Cagayan de Oro City",
  },
  {
    image: require("../../../assets/participants_images/bday.jpg"),
    title: "Barbella's Birthday",
    date: "12 August, 23",
    location: "Cagayan de Oro City",
  },
  {
    image: require("../../../assets/participants_images/reunion.jpg"),
    title: "Class of 1979 Reunion",
    date: "25-27 July, 23",
    location: "Cagayan de Oro City",
  },
  {
    image: require("../../../assets/participants_images/debut.jpg"),
    title: "Barbella's Debut",
    date: "23 Sept, 25",
    location: "Cagayan de Oro City",
  },
  {
    image: require("../../../assets/participants_images/kids.png"),
    title: "Kids Party",
    date: "12 August, 24",
    location: "Cagayan de Oro City",
  },
];


const styles = StyleSheet.create({
  viewAllText: {
    fontSize: 14,
    color: "#FFC700",
  },
  eventsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 30,
    marginRight: 10,
    alignItems: "center",
    width: 200,
  },
  eventImageContainer: {
    position: "relative",
    width: "100%",
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  addEventButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FFC700",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButtonText: {
    color: "#000",
    fontSize: 18,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  eventDate: {
    fontSize: 13,
    color: "#555",
  },
  eventLocation: {
    fontSize: 13,
    color: "#555",
  },
  chooseEventSection: {
    marginBottom: 20,
  },
  eventTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  eventTypeButton: {
    backgroundColor: "#FFC700",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  eventTypeButtonText: {
    color: "#333",
    fontSize: 14,
  },
  featuredEventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  featuredEventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  featuredEventInfo: {
    flex: 1,
  },
  featuredEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  featuredEventDate: {
    fontSize: 14,
    color: "#555",
  },
  featuredEventLocation: {
    fontSize: 14,
    color: "#555",
  },
  screenContainer: {
    flex: 1,
    // Other styles for your screen container
  },
  margintop: { marginTop: 160 },
});
