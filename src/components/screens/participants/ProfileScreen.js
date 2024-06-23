import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import Scrollview from "../../elements/ScrollViewScreens";

const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../../../assets/participants_images/Wallpaper.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
            <Button
              title="+"
              onPress={() => {}}
              style={styles.addPhotoButton}
            />
          </View>
          <Text style={styles.serviceProviderName}>Service Provider Name</Text>
          <Text style={styles.address}>Event Service Provider Address</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Open: 06:00 am</Text>
            <Text style={styles.timeText}>Close: 09:00 pm</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.popularEventsTitle}>Popular Events</Text>
        <Scrollview />
      </ScrollView>
    </ImageBackground>
  );
};

// const events = [
//   {
//     image: "https://link-to-image.com/image1.jpg",
//     title: "Mr. & Mrs. Malik Wedding",
//     date: "23 Sept, 23",
//     location: "Cagayan de Oro City",
//   },
//   {
//     image: "https://link-to-image.com/image2.jpg",
//     title: "Barbella's Birthday",
//     date: "12 August, 23",
//     location: "Cagayan de Oro City",
//   },
//   {
//     image: "https://link-to-image.com/image3.jpg",
//     title: "Class of 1979 Reunion",
//     date: "25-27 July, 23",
//     location: "Cagayan de Oro City",
//   },
//   {
//     image: "https://link-to-image.com/image4.jpg",
//     title: "Barbella's Debut",
//     date: "23 Sept, 25",
//     location: "Cagayan de Oro City",
//   },
//   {
//     image: "https://link-to-image.com/image5.jpg",
//     title: "Kids Party",
//     date: "12 August, 24",
//     location: "Cagayan de Oro City",
//   },
// ];

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  profileContainer: {
    backgroundColor: "rgba(35,32,0, 0.3)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  photoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  addPhotoButton: {
    fontSize: 30,
  },
  serviceProviderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  address: {
    fontSize: 16,
    marginVertical: 10,
    color: "white",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    color: "white",
  },
  timeText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  editButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  logoutButton: {
    backgroundColor: "#FFD700",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  popularEventsTitle: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  eventsContainer: {
    flexDirection: "row",
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    width: 200,
  },
  eventImageContainer: {
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  addEventButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FFD700",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButtonText: {
    color: "#000",
    fontSize: 18,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
  },
  eventLocation: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProfileScreen;
