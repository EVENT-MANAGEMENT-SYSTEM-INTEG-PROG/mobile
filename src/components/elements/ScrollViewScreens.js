import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { getEvents } from '../../services/organizer/organizerServices'; // Adjust the import path as needed
import renderImage from '../../services/organizer/renderImage';

const ScrollViewScreens = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
      setLoading(false);
    } catch (error) {
      console.error('Fetch events error:', error);
      Alert.alert('Error', 'Failed to fetch events');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal style={styles.eventsContainer}>
      {events.map((event, index) => (
        <View key={index} style={styles.eventCard}>
          <View style={styles.eventImageContainer}>
            <Image source={{ uri: `${renderImage}/${event.event_image}` }} style={styles.eventImage} />
          </View>
          <Text style={styles.eventTitle}>{event.event_name}</Text>
          <Text style={styles.eventDate}>{event.event_date}</Text>
          <Text style={styles.eventLocation}>{event.event_location}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
  },
  margintop: { 
    marginTop: 160 
  },
});

export default ScrollViewScreens;