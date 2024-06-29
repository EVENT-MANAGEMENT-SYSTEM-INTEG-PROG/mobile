import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import Scrollview from "../../elements/ScrollViewScreens";
import { AuthContext } from "../../../services/authentication/authContext";
import { getUser, updateAccount } from '../../../services/authentication/authServices';
import { useFocusEffect } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const { signOut } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    user_name: "",
    password: "", 
    mobile_number: "",
    country: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setUserData(userData);
      setFirstname(userData.first_name);
      setLastname(userData.last_name);
      setCountry(userData.country);
      setEditedProfile(userData); // Initialize editedProfile with fetched data
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Call logout function from authService.js
      navigation.navigate('LoginScreen'); // Navigate to LoginScreen upon successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error (if any)
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // Reset edited profile state if closing modal
    if (!isModalVisible && userData) {
      setEditedProfile({
        first_name: userData.first_name,
        last_name: userData.last_name,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
        email: userData.email,
        user_name: userData.user_name,
        password: userData.password,
        mobile_number: userData.mobile_number,
        country: userData.country,
      });
      fetchUserData();
    }
  };

  const saveEditedProfile = async () => {
    try {
      // Implement updateAccount function to update user account
      await updateAccount(editedProfile); // Assuming updateAccount accepts updated profile data

      // Update displayed profile info with edited data
      setFirstname(editedProfile.first_name);
      setLastname(editedProfile.last_name);
      setCountry(editedProfile.country);

      // Close the modal after saving
      toggleModal();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, show error message, etc.
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
            <Avatar.Image
              size={100}
              source={require("../../../../assets/organizer_images/organizer_profle.png")}
              style={{backgroundColor: '#000'}}
            />
          </View>
          <Text style={styles.serviceProviderName}>{first_name} {last_name}</Text>
          <Text style={styles.address}>{country}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={toggleModal}>
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

      {/* Modal for editing profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={editedProfile.first_name}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, first_name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={editedProfile.last_name}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, last_name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={editedProfile.gender}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, gender: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={editedProfile.country}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, date_of_birth: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedProfile.email}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={editedProfile.user_name}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, user_name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={editedProfile.password}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, password: text })
              }
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={editedProfile.mobile_number}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, mobile_number: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={editedProfile.country}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, country: text })
              }
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveEditedProfile}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={toggleModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    width: "40%",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#FFD700",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#666",
  },
});

export default ProfileScreen;