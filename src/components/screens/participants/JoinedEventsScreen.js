import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CustomHeader from "../../elements/CustomHeader";
import DeleteLeaveModal from "./ModalScreen";
import { getRegistration, deleteRegistration } from "../../../services/participants/participantsServices";
import { getEventById } from "../../../services/organizer/organizerServices";
import { getUser } from "../../../services/authentication/authServices";

const JoinedEventsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [registrations, setRegistrations] = useState([]); // State to hold registrations
  const [selectedRegistration, setSelectedRegistration] = useState(null); // State to hold selected registration for delete action
  const [userId, setUserId] = useState(null); // State to hold user ID
  const [loading, setLoading] = useState(true); // State to manage loading

  useFocusEffect(
    React.useCallback(() => {
      fetchUserAndRegistrations();
    }, [])
  );

  const fetchUserAndRegistrations = async () => {
    try {
      const user = await getUser(); // Fetch logged-in user's details
      setUserId(user.user_id); // Set user ID
      const data = await getRegistration(); // Fetch registrations
      const userRegistrations = data.filter(registration => registration.user_id === user.user_id); // Filter registrations for the logged-in user

      // Fetch event details for each registration
      const eventDetailsPromises = userRegistrations.map(async (registration) => {
        const event = await getEventById(registration.event_id);
        return {
          ...registration,
          event_name: event.event_name,
        };
      });

      // Wait for all promises to resolve
      const updatedRegistrations = await Promise.all(eventDetailsPromises);
      setRegistrations(updatedRegistrations); // Update registrations with event names
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Failed to fetch user or registrations:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration); // Set the selected registration for deletion
    setModalVisible(true);
  };

  const handleLeaveEvent = async () => {
    if (!selectedRegistration) return;

    try {
      await deleteRegistration(selectedRegistration.register_id); // Use register_id for deletion
      // After deletion, update the registrations state to reflect the change
      const updatedRegistrations = registrations.filter(
        (reg) => reg.register_id !== selectedRegistration.register_id
      );
      setRegistrations(updatedRegistrations);
    } catch (error) {
      console.error("Failed to leave event:", error);
    }

    setModalVisible(false); // Close the modal after action
    setSelectedRegistration(null); // Reset selected registration
  };

  const handleCancel = () => {
    setSelectedRegistration(null); // Reset selected registration
    setModalVisible(false); // Close the modal without action
  };

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const handleFeedbackPress = (registration) => {
    navigation.navigate("Feedback", { user_id: userId, event_id: registration.event_id }); // Replace with the actual screen name
  };

  // Navigation buttons data
  const buttons = [
    { title: "Events", screen: "EventsStack" },
    { title: "Calendar", screen: "Calendar" },
    { title: "Joined Events", screen: "JoinedEvents" },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader
          title="Your Screen Title"
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainerNav}>
          {/* Render navigation buttons */}
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.screen}
              style={[
                styles.buttonNav,
                navigation.getState().routes[navigation.getState().index]
                  .name === button.screen
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handlePress(button.screen)}
            >
              <Text
                style={[
                  styles.buttonTextInactive,
                  navigation.getState().routes[navigation.getState().index]
                    .name === button.screen && styles.activeButtonText,
                ]}
              >
                {button.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Render registrations */}
        {registrations.map((registration) => (
          <View key={registration.register_id} style={styles.registrationCard}>
            <Text style={styles.eventName}>{registration.event_name}</Text>
            <Text style={styles.registrationDetails}>
              Status: {registration.register_status}
            </Text>
            <Text style={styles.registrationDetails}>
              Date: {registration.register_date}
            </Text>
            {/* Add more details as needed */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleOpenModal(registration)}
                style={styles.buttonDelete}
              >
                <Text style={styles.buttonText}>LEAVE EVENT</Text>
              </TouchableOpacity>
              <DeleteLeaveModal
                visible={modalVisible}
                onLeave={handleLeaveEvent}
                onCancel={handleCancel}
                registration={selectedRegistration} // Pass selected registration data to modal
              />
              <TouchableOpacity
                onPress={() => handleFeedbackPress(registration)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>FEEDBACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.margintop}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  registrationCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#e6e6e6", // Adjust background color for registrations
    // Add more styling as needed
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "", // Customize text color
    // Add more styling as needed
  },
  registrationDetails: {
    fontSize: 14,
    marginTop: 5,
    color: "#333", // Customize text color
    // Add more styling as needed
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // Add more styling as needed
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFC42B", // Change as needed
    // Add more styling as needed
  },
  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "red", // Change as needed
    // Add more styling as needed
  },
  buttonText: {
    color: "#fff",
    // Add more styling as needed
  },
  buttonContainerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginVertical: 20,
  },
  buttonNav: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
  },
  activeButton: {
    backgroundColor: "#FFC42B",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  buttonTextInactive: {
    fontSize: 16,
    color: "#FFC42B", // Color for inactive buttons
    textAlign: "center",
  },
  activeButtonText: {
    color: "black", // Color for active button text
  },
  margintop: { marginTop: 140 },
});

export default JoinedEventsScreen;