import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createRegistration } from "../../../services/participants/participantsServices";
import { getEvents } from "../../../services/organizer/organizerServices";
import { getUser } from "../../../services/authentication/authServices";

const BookEventScreen = ({ route, navigation }) => {
  const { eventName } = route.params; // Destructure the event name from route params
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [events, setEvents] = useState([]);
  const [user_id, setUser_id] = useState(""); // State for user_id
  const [eventDetails, setEventDetails] = useState(null); // State to hold event details

  // Fetch events and user data on component focus
  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
      fetchUserData();
    }, [])
  );

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents(); // Assuming getEvents returns an array of events
      setEvents(eventsData); // Optionally set events array if needed elsewhere
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Failed to fetch events.");
    }
  };

  // Function to fetch user data and set user_id state
  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setUser_id(userData.user_id); // Assuming userData has user_id property
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Function to save the participant's event booking
  const saveEvent = async () => {
    if (!registerStatus || !registerCode || !eventDetails) {
      showToast("Please fill in all the details.");
      return;
    }

    const registrationData = {
      user_id: user_id, // Use the state value for user_id
      event_id: eventDetails.event_id,
      register_status: registerStatus,
      register_code: registerCode,
      register_date: eventDetails.event_date, // Directly use event_date from event details
      register_time: new Date().toLocaleTimeString("en-GB"),
    };

    try {
      await createRegistration(registrationData);
      showToast("Event booked successfully!");
      navigation.navigate("JoinedEvents", { user_id: user_id }); // Navigate to EventList after booking
    } catch (e) {
      console.error("Error booking event:", e);
      showToast("Failed to book event.");
    }
  };

  // Function to show toast messages
  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  useEffect(() => {
    // Find the event details based on eventName
    const selectedEvent = events.find((event) => event.event_name === eventName);
    if (selectedEvent) {
      setEventDetails(selectedEvent); // Set event details once found
    }
  }, [events, eventName]);

  return (
    <ImageBackground style={styles.eventCreationPage}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Book Event</Text>
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName} // Use eventName from route params
              editable={false}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Register Status"
              value={registerStatus}
              onChangeText={setRegisterStatus}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Register Code"
              value={registerCode}
              onChangeText={setRegisterCode}
              keyboardType="numeric"
            />
          </View>
          {eventDetails && (
            <View style={styles.formGroup}>
              <Text style={styles.selectedDateText}>EVENT DATE:</Text>
              <Text style={styles.selectedDate}>{eventDetails.event_date}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.bookButton} onPress={saveEvent}>
            <Text style={styles.bookButtonText}>Book Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  eventCreationPage: {
    flex: 1,
    backgroundColor: "black",
  },
  goBackButton: {
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 5,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#FFC42B",
    fontSize: 24,
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  selectedDateText: {
    color: "white",
    marginTop: 10,
    alignSelf: "center",
    fontSize: 16,
  },
  selectedDate: {
    color: "white",
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "gray",
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 110,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
});

export default BookEventScreen;
