// dashboard.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { Avatar, Provider as PaperProvider } from 'react-native-paper'; 
import NavBar from './nav'; 
import FindEvent from './findevent';
import Create from './create';

const Dashboard = () => {
  const navigation = useNavigation(); 

  const handleViewAllPress = (section) => {
    console.log(`View All ${section} clicked`);
  };

  const [likedEvents, setLikedEvents] = useState({});
  const [buttonStates, setButtonStates] = useState([false, false, false, false]);

  const toggleLike = (eventId) => {
    setLikedEvents(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));
  };

  const handleButtonPress = (index) => {
    setButtonStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const events = [
    {
      id: 1,
      image: require("../../../../assets/event1.png"),
      title: "Mr. & Mrs. Malik Wedding",
      date: "23 Sept, 25",
      location: "Cagayan de Oro City"
    },
    {
      id: 2,
      image: require("../../../../assets/event2.png"),
      title: "Barbella’s Birthday",
      date: "12 August, 23",
      location: "Cagayan de Oro City"
    },
    {
      id: 3,
      image: require("../../../../assets/event3.png"),
      title: "Class of 1979 Reunion",
      date: "25-27 July, 23",
      location: "Cagayan de Oro City"
    }
  ];

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Burger icon to open sidebar */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Dashboard</Text>

        <View style={styles.profileSection}>
          <Avatar.Image
            size={50}
            source={require("../../../../assets/pro_pic.png")}
            style={styles.profilePicture}
          />
          <View style={styles.welcomeUsername}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.usernameText}>Username</Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Cagayan de Oro</Text>
            <MaterialCommunityIcons
              name="map-marker"
              color="#FFC42B"
              size={23}
              style={styles.locationIcon}
            />
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.findEventsButton}
              onPress={() => navigation.navigate(FindEvent)} // Navigate to Find Event screen
            >
              <MaterialCommunityIcons name="magnify" color="#000" size={20} />
              <Text style={styles.findEventsButtonText}>Find Events</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate(Create)} // Navigate to Create screen
            >
              <MaterialCommunityIcons name="plus" color="#000" size={20} />
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Popular Events</Text>
          <TouchableOpacity onPress={() => handleViewAllPress("Popular Events")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Image source={event.image} style={styles.eventImage} />
              <TouchableOpacity onPress={() => toggleLike(event.id)} style={[styles.heartIcon, likedEvents[event.id] ? styles.heartLiked : null]}>
                <MaterialCommunityIcons 
                  name={likedEvents[event.id] ? "heart" : "heart-outline"} 
                  color={likedEvents[event.id] ? "#FF0000" : "#888"} 
                  size={20} 
                />
              </TouchableOpacity>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetailRow}>
                <View style={styles.eventDetailContainer}>
                  <MaterialCommunityIcons name="calendar" color="#2A93D5" size={16} />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailContainer}>
                  <MaterialCommunityIcons name="map-marker" color="#2A93D5" size={16} />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.chooseEventContainer}>
          <Text style={styles.sectionTextChooseEvent}>Choose Event</Text>
          <TouchableOpacity onPress={() => handleViewAllPress("Choose Event")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.buttonScrollView}>
          {["Wedding", "Birthday", "Reunion", "Debut"].map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonContainer,
                buttonStates[index] ? styles.buttonPressed : styles.buttonNormal
              ]}
              onPress={() => handleButtonPress(index)}
            >
              <Text
                style={[
                  styles.buttonText,
                  buttonStates[index] ? styles.buttonTextPressed : styles.buttonTextNormal
                ]}
              >
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.boxContainer}>
          <Image source={require("../../../../assets/event3.png")} style={styles.boxImage} />
          <View style={styles.boxTextContainer}>
            <Text style={styles.boxTitle}>Mr. & Mrs. Ambot Lang 2024</Text>
            <View style={styles.boxDetailRow}>
              <MaterialCommunityIcons name="calendar" color="#2A93D5" size={16} />
              <Text style={styles.boxDetailText}>25 July, 24</Text>
            </View>
            <View style={styles.boxDetailRow}>
              <MaterialCommunityIcons name="map-marker" color="#2A93D5" size={16} />
              <Text style={styles.boxDetailText}>LK Luxe Hotel</Text>
            </View>
          </View>
        </View>
        <NavBar />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    marginRight: 10,
    marginTop: 20,
  },
  welcomeUsername: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "auto",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 12,
    color: "#FFF",
  },
  usernameText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "600",
  },
  spacer: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#FFF",
    textDecorationLine: "underline",
    marginRight: 5,
    marginTop: 20,
  },
  locationIcon: {
    marginRight: 5,
    marginTop: 20,
  },
  searchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 250,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#FFF",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  sectionTextChooseEvent: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 12,
    color: "#2A93D5",
    textDecorationLine: "underline",
  },
  scrollView: {
    marginBottom: 20,
  },
  eventCard: {
    width: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  heartLiked: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    padding: 5,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  eventDetailRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  eventDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    fontSize: 12,
    color: "#FFF",
    marginLeft: 5,
  },
  chooseEventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonScrollView: {
    marginBottom:10,
  },
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonNormal: {
    borderColor: "#FFC42B",
    backgroundColor: "#000",
  },
  buttonPressed: {
    borderColor: "#FFC42B",
    backgroundColor: "#FFC42B",
  },
  buttonText: {
    fontSize: 14,
  },
  buttonTextNormal: {
    color: "#FFF",
  },
  buttonTextPressed: {
    color: "#000",
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  boxImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  boxTextContainer: {
    flex: 1,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  boxDetailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxDetailText: {
    fontSize: 12,
    color: "#FFF",
    marginLeft: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
  },
  findEventsButton: {
    backgroundColor: "#FFC42B",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  findEventsButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  createButton: {
    backgroundColor: "#FFC42B",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  createButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  }
});

export default Dashboard;