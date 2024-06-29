import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getEvents } from '../../services/organizer/organizerServices'; // Adjust the import path as needed
import renderImage from '../../services/organizer/renderImage';

const FestivalCard = ({ name, date, location, description, image, event_id }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("SelectedEvent", { name, date, location, description, image, event_id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.location}>{location}</Text>
    </TouchableOpacity>
  );
};

const Cards = ({ searchQuery }) => {
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

  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredEvents.map((event) => (
        <FestivalCard
          key={event.event_id}
          name={event.event_name}
          date={event.event_date}
          location={event.event_location}
          description={event.event_description}
          image={`${renderImage}/${event.event_image}`}
          event_id={event.event_id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "45%",
    height: 220,
    marginBottom: 25,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
    paddingTop: 5,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
  location: {
    fontSize: 13,
    color: "#888",
  }
});

export default Cards;