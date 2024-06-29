import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavBar from './nav';
import { getEvents } from '../../../services/organizer/organizerServices';
import { getParticipants } from '../../../services/authentication/authServices';
import { getRegistration } from '../../../services/participants/participantsServices';

const Participant = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchEvents();
        await fetchParticipants();
        await fetchRegistrations();
        setLoading(false); // Set loading to false after all fetches are done
      };

      fetchData();
    }, [])
  );

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents(); // Fetch events using getEvents function
      setEvents(eventsData); // Save the original events data
    } catch (error) {
      console.error('Fetch events error:', error);
      Alert.alert('Error', 'Failed to fetch events');
    }
  };

  const fetchParticipants = async () => {
    try {
      const participantsData = await getParticipants(); // Fetch participants data using getParticipants function
      setParticipants(participantsData); // Save the participants data
    } catch (error) {
      console.error('Fetch participants error:', error);
      Alert.alert('Error', 'Failed to fetch participants data');
    }
  };

  const fetchRegistrations = async () => {
    try {
      const registrationsData = await getRegistration(); // Fetch registration data using getRegistration function
      setRegistrations(registrationsData); // Save the registrations data
    } catch (error) {
      console.error('Fetch registrations error:', error);
      Alert.alert('Error', 'Failed to fetch registrations data');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}>Events and Participants</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading events and participants...</Text>
          ) : (
            events.map(event => (
              <View key={event.event_id} style={styles.eventCard}>
                <Text style={styles.eventTitle}>Event Name: {event.event_name}</Text>
                <Text style={styles.detailText}>Participants:</Text>
                {registrations
                  .filter(registration => registration.event_id === event.event_id)
                  .map((registration, index) => {
                    const participant = participants.find(participant => participant.user_id === registration.user_id);
                    return participant ? (
                      <Text key={index} style={styles.detailText}>{participant.email}</Text>
                    ) : null;
                  })}
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  sectionTitle: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#cccccc',
    marginVertical: 2,
  },
});

export default Participant;