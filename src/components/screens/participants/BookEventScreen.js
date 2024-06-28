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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { createParticipant } from "../../../services/participants/participantsServices";
import { getEvents } from "../../../services/organizer/organizerServices";
import { getUser } from "../../../services/authentication/authServices";

const BookEventScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [eventName, setEventName] = useState(""); // State for event name
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [events, setEvents] = useState([]);
  const [user_id, setUser_id] = useState(""); // State for user_id
  const navigation = useNavigation();

  // Fetch events on component focus
  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  // Fetch user data on component focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Function to fetch events and set eventName state
  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents(); // Assuming getEvents returns an array of events
      if (eventsData.length > 0) {
        setEventName(eventsData[0].event_name); // Set event_name from the first event (adjust this logic as per your requirement)
        setEvents(eventsData); // Optionally set events array if needed elsewhere
      }
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
      console.error('Failed to fetch user data:', error);
    }
  };

  // Function to save the participant's event booking
  const saveEvent = async () => {
    if (!selectedDate || !registerStatus || !registerCode) {
      showToast("Please fill in all the details.");
      return;
    }

    // Find the event ID based on eventName (adjust logic as per your actual data structure)
    const selectedEvent = events.find((event) => event.event_name === eventName);
    if (!selectedEvent) {
      showToast("Event not found.");
      return;
    }

    const participantData = {
      user_id: user_id, // Use the state value for user_id
      event_id: selectedEvent.event_id,
      register_status: registerStatus,
      register_code: registerCode,
      register_date: selectedDate,
      register_time: new Date().toLocaleTimeString("en-GB"),
    };

    try {
      await createParticipant(participantData);
      showToast("Event booked successfully!");
      navigation.navigate("EventList"); // Navigate to EventList after booking
    } catch (e) {
      console.error("Error booking event:", e);
      showToast("Failed to book event.");
    }
  };

  // Function to show toast messages
  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  // Function to handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false); // Close calendar after date selection
  };

  // Function to toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <>
      <ImageBackground style={styles.eventCreationPage}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 20 }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Book Event</Text>
              </View>
              <View style={styles.formGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Event Name"
                  value={eventName}
                  onChangeText={setEventName}
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
              <View style={styles.formGroup}>
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={toggleCalendar}
                >
                  <Text style={styles.calendarButtonText}>
                    Choose from calendar (EVENT DATE)
                  </Text>
                </TouchableOpacity>
                {isCalendarVisible && (
                  <View style={styles.calendarContainer}>
                    <Calendar
                      onDayPress={handleDateChange}
                      markedDates={{
                        [selectedDate]: {
                          selected: true,
                          marked: true,
                          selectedColor: "#e6b800",
                        },
                      }}
                      theme={{
                        backgroundColor: "#23232e",
                        calendarBackground: "#23232e",
                        textSectionTitleColor: "#cdb6c1",
                        selectedDayBackgroundColor: "#e6b800",
                        selectedDayTextColor: "#23232e",
                        todayTextColor: "#e6b800",
                        dayTextColor: "#fff",
                        textDisabledColor: "#424242",
                        dotColor: "#e6b800",
                        selectedDotColor: "#23232e",
                        arrowColor: "#e6b800",
                      }}
                    />
                  </View>
                )}
                {selectedDate && (
                  <View style={styles.formGroup}>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 10,
                        alignSelf: "center",
                        fontSize: 16,
                      }}
                    >
                      SELECTED DATE:
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 10,
                        alignSelf: "center",
                        backgroundColor: "gray",
                        padding: 8,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {selectedDate}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.bookButton} onPress={saveEvent}>
                <Text style={styles.bookButtonText}>Book Event</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </>
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
  calendarButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 2,
  },
  calendarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  calendarContainer: {
    marginTop: 10,
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
});

export default BookEventScreen;
