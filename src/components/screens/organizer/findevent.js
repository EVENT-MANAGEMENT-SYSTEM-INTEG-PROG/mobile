import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavBar from './nav';
import { getEvents, deleteEvent, updateEvent } from '../../../services/organizer/organizerServices'; // Import deleteEvent and updateEvent functions
import renderImage from '../../../services/organizer/renderImage';

const FindEvent = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState({});
  const [loading, setLoading] = useState(true); // Loading state for initial data fetching

  // State for edit mode and edited event data
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    event_name: '',
    event_description: '',
    event_date: '',
    event_time: '',
    event_location: '',
    event_status: '',
    organizer: '',
    participants: [],
    event_image: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
    }, [])
  );

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents(); // Fetch events using getEvents function
      setEvents(eventsData); // Save the original events data
      setFilteredEvents(eventsData); // Initialize filteredEvents with fetched data
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Fetch events error:', error);
      Alert.alert('Error', 'Failed to fetch events');
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.event_name ? item.event_name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(events); // Reset filteredEvents to original eventsData when search is cleared
    }
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setEditedEvent(item); // Set editedEvent state to selected event data
    setEditMode(false); // Set edit mode to false initially
    setModalVisible(true);
  };

  const toggleLike = (event_id) => {
    setLikedEvents((prevLikedEvents) => ({
      ...prevLikedEvents,
      [event_id]: !prevLikedEvents[event_id], // Toggle like state for specific event id
    }));
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.event_id);
      Alert.alert('Success', 'Event deleted successfully');
      setModalVisible(false);
      fetchEvents(); // Refresh events after deletion
    } catch (error) {
      console.error('Delete event error:', error);
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(selectedEvent.event_id, editedEvent);
      Alert.alert('Success', 'Event updated successfully');
      setModalVisible(false);
      fetchEvents(); // Refresh events after update
    } catch (error) {
      console.error('Update event error:', error);
      Alert.alert('Error', 'Failed to update event');
    }
  };

  const renderEventItem = ({ item }) => {
    const imageUrl = `${renderImage}/${item.event_image}`;

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleEventClick(item)}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onError={(error) => console.error('Image load error:', error.nativeEvent.error)}
        />
        <Text style={styles.title}>{item.event_name}</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
            <Text style={styles.detailText}>{item.event_date}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
            <Text style={styles.detailText}>{item.event_location}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.heartIcon, likedEvents[item.event_id] ? styles.heartLiked : null]}
          onPress={() => toggleLike(item.event_id)}
        >
          <MaterialCommunityIcons
            name={likedEvents[item.event_id] ? 'heart' : 'heart-outline'}
            color={likedEvents[item.event_id] ? '#FF0000' : '#888'}
            size={20}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <AntDesign name="arrowleft" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search Event"
            placeholderTextColor="#888"
            onChangeText={(text) => handleSearch(text)}
            value={search}
          />
        </View>
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.event_id}
          numColumns={2}
        />
        {selectedEvent && (
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedEvent.event_name}</Text>
                {editMode ? (
                    <>
                      <Text style={styles.label}>Event Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Name"
                        value={editedEvent.event_name}
                        onChangeText={(text) =>
                          setEditedEvent((prev) => ({ ...prev, event_name: text }))
                        }
                      />

                      <Text style={styles.label}>Event Description</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Description"
                        value={editedEvent.event_description}
                        onChangeText={(text) =>
                          setEditedEvent((prev) => ({ ...prev, event_description: text }))
                        }
                      />

                      <Text style={styles.label}>Event Date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Date"
                        value={editedEvent.event_date}
                        onChangeText={(text) =>
                          setEditedEvent((prev) => ({ ...prev, event_date: text }))
                        }
                      />

                      <Text style={styles.label}>Event Time</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Time"
                        value={editedEvent.event_time}
                        onChangeText={(text) =>
                          setEditedEvent((prev) => ({ ...prev, event_time: text }))
                        }
                      />

                      <Text style={styles.label}>Event Location</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Event Location"
                        value={editedEvent.event_location}
                        onChangeText={(text) =>
                          setEditedEvent((prev) => ({ ...prev, event_location: text }))
                        }
                      />

                      {/* Add other input fields for event details */}
                      <TouchableOpacity style={styles.modalButtonEdit} onPress={handleUpdateEvent}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalButtonEdit} onPress={() => setEditMode(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setEditMode(true)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleDeleteEvent}>
                      <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>

      <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 80,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  itemContainer: {
    margin: 10,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  detailContainer: {
    marginTop: 5,
    alignItems: 'flex-start',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    borderColor: '#FFC42B',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC42B',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFC42B',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalButtonEdit: {
    backgroundColor: '#FFC42B',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 'auto',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#FFC42B',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DADADA',
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  heartLiked: {
    backgroundColor: '#DADADA',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default FindEvent;