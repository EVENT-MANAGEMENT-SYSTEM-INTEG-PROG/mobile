import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const EventPortfolio = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const handleCreateEvent = () => {
    // Add logic to create event
    console.log("Event Created:", { eventName, eventLocation, eventDate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Event Portfolio</Text>
      <TouchableOpacity style={styles.coverPhoto}>
        <Text style={styles.coverPhotoText}>Add Cover Photo</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Event Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Type event name"
          placeholderTextColor="#999"
          value={eventName}
          onChangeText={setEventName}
        />
        <TextInput
          style={styles.input}
          placeholder="Type event location"
          placeholderTextColor="#999"
          value={eventLocation}
          onChangeText={setEventLocation}
        />
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {eventDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Create Event Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  coverPhoto: {
    borderWidth: 1,
    borderColor: "#FFD700",
    borderRadius: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  coverPhotoText: {
    color: "#FFD700",
    fontSize: 18,
  },
  form: {
    width: "100%",
  },
  label: {
    color: "#FFD700",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#FFF",
  },
  datePicker: {
    backgroundColor: "#333",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datePickerText: {
    color: "#FFF",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EventPortfolio;
