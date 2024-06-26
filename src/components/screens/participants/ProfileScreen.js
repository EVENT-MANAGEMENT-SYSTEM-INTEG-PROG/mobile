import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../../services/authentication/authContext";
import { getUser } from '../../../services/authentication/authServices';

const ProfileScreen = ({ navigation }) => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const { signOut } = useContext(AuthContext);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setFirstname(userData.first_name); 
        setLastname(userData.last_name); 
        setCountry(userData.country); 
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(); // Call logout function from authService.js
      navigation.navigate('LoginScreen'); // Navigate to LoginScreen upon successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error (if any)
    }
  };

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
          <Text style={styles.serviceProviderName}>{first_name} {last_name}</Text>
          <Text style={styles.address}>{country}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Open: 06:00 am</Text>
            <Text style={styles.timeText}>Close: 09:00 pm</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
});

export default ProfileScreen;
