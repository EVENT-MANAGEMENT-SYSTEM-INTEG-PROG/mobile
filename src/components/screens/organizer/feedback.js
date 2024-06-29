import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavBar from './nav';
import { getEvents } from '../../../services/organizer/organizerServices';
import { getParticipants } from '../../../services/authentication/authServices';
import { getEvaluations } from '../../../services/participants/evaluationServices';

const Feedback = () => {
  const navigation = useNavigation();
  const [evaluations, setEvaluations] = useState([]);
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await fetchEvaluations();
        await fetchEvents();
        await fetchParticipants();
        setLoading(false); // Set loading to false after all fetches are done
      };

      fetchData();
    }, [])
  );

  const fetchEvaluations = async () => {
    try {
      const evaluationsData = await getEvaluations(); // Fetch evaluations using getEvaluations function
      setEvaluations(evaluationsData); // Save the evaluations data
    } catch (error) {
      console.error('Fetch evaluations error:', error);
      Alert.alert('Error', 'Failed to fetch evaluations');
    }
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}>Participant Feedbacks:</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading feedbacks...</Text>
          ) : (
            evaluations.map(evaluation => {
              const event = events.find(event => event.event_id === evaluation.event_id);
              const participant = participants.find(participant => participant.user_id === evaluation.user_id);
              return (
                <View key={evaluation.id} style={styles.evaluationCard}>
                  <Text style={styles.detailText}>Event: {event ? event.event_name : 'Unknown'}</Text>
                  <Text style={styles.detailText}>Participant: {participant ? participant.email : 'Unknown'}</Text>
                  <Text style={styles.detailText}>Rating: {evaluation.evaluation_rating}</Text>
                  <Text style={styles.detailText}>Remarks: {evaluation.remarks}</Text>
                  <Text style={styles.detailText}>Status: {evaluation.evaluation_status}</Text>
                  <Text style={styles.detailText}>Created Date: {evaluation.created_date_time}</Text>
                </View>
              );
            })
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
  evaluationCard: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#cccccc',
    marginVertical: 2,
  },
});

export default Feedback;