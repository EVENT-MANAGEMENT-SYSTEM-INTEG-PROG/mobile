import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

// error pa haha

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { eventName } = route.params || {};

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (eventName) {
          const jsonValue = await AsyncStorage.getItem(eventName);
          if (jsonValue !== null) {
            setEventDetails(JSON.parse(jsonValue));
          }
        }
      } catch (e) {
        console.error("Error fetching event details:", e);
        showToast("Failed to fetch event details.");
      }
    };

    fetchEventDetails();
  }, [eventName]);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  if (!eventName) {
    return (
      <ImageBackground style={styles.container}>
        <View style={styles.margin}>
          <Text style={styles.errorText}>
            No event details available. Please go back and book an event first.
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Details</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Type:</Text>
          <Text style={styles.detailValue}>{eventDetails.eventType}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Name:</Text>
          <Text style={styles.detailValue}>{eventDetails.eventName}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Date:</Text>
          <Text style={styles.detailValue}>{eventDetails.eventDate}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Venue Location:</Text>
          <Text style={styles.detailValue}>{eventDetails.eventLocation}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Description:</Text>
          <Text style={styles.detailValue}>{eventDetails.description}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Budget:</Text>
          <Text
            style={styles.detailValue}
          >{`${eventDetails.budget[0]} - ${eventDetails.budget[1]}`}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Invitation Message:</Text>
          <Text style={styles.detailValue}>
            {eventDetails.invitationMessage}
          </Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>People to Invite:</Text>
          <Text style={styles.detailValue}>{eventDetails.peopleToInvite}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "black", flexGrow: 1 },
  margin: { marginHorizontal: 20 },
  eventDetailsPage: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  goBackButton: {
    marginLeft: 30,
    marginTop: 45,
    marginBottom: 5,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#e6b800",
    fontSize: 24,
    fontWeight: "bold",
  },
  detailGroup: {
    marginBottom: 20,
  },
  detailLabel: {
    color: "#e6b800",
    fontSize: 18,
    fontWeight: "bold",
  },
  detailValue: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default EventDetails;
