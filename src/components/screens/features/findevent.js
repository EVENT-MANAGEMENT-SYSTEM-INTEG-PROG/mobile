// findevent.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('../../../../assets/event1.png'), date: '2024-07-01', address: 'CDO' },
  { id: '2', title: 'Elizabeth Birthday', image: require('../../../../assets/event2.png'), date: '2024-08-12', address: 'CDO' },
  { id: '3', title: 'Class of 1979 Reunion', image: require('../../../../assets/event3.png'), date: '2024-09-25', address: 'CDO' },
  { id: '4', title: 'Corporate Party', image: require('../../../../assets/event1.png'), date: '2024-10-30', address: 'CDO' },
  { id: '5', title: 'Annual Gala', image: require('../../../../assets/event2.png'), date: '2024-11-15', address: 'CDO' },
  { id: '6', title: 'New Year Celebration', image: require('../../../../assets/event3.png'), date: '2024-12-31', address: 'CDO' },
  { id: '7', title: 'Music Festival', image: require('../../../../assets/event1.png'), date: '2024-06-22', address: 'CDO' },
  { id: '8', title: 'Art Exhibition', image: require('../../../../assets/event2.png'), date: '2024-07-05', address: 'CDO' },
];

const FindEvent = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState({});

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = eventsData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(eventsData);
    }
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleEventClick(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.heartIcon, likedEvents[item.id] ? styles.heartLiked : null]}
        onPress={() => toggleLike(item.id)}
      >
        <MaterialCommunityIcons
          name={likedEvents[item.id] ? 'heart' : 'heart-outline'}
          color={likedEvents[item.id] ? '#FF0000' : '#888'}
          size={20}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
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
        keyExtractor={(item) => item.id}
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
              <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={() => alert('Edit clicked')}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => alert('Remove clicked')}>
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => alert('More Info clicked')}>
                  <Text style={styles.buttonText}>More Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => alert('Participant clicked')}>
                  <Text style={styles.buttonText}>Participant</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            
          </View>
          
        </Modal>
      )}
      <NavBar />

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flex: 1,
    margin: 10,
    alignItems: 'center',
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
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
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
});

export default FindEvent;
