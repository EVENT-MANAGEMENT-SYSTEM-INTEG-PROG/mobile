import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import NavBar from './nav';

const services = [
  {
    id: '1',
    name: 'Catering Service',
    description: 'Delicious food for all types of events. Specializes in diverse menus and dietary preferences.',
    status: 'Active',
    location: 'City A',
    rate: '$$$',
    phoneNumber: '123-456-7890',
    role: 'Food Service Provider',
    image: require('../../../../assets/catering.jpg')
  },
  {
    id: '2',
    name: 'Photography Service',
    description: 'Capturing beautiful moments with professional photographers. High-quality prints and digital images available.',
    status: 'Active',
    location: 'City B',
    rate: '$$',
    phoneNumber: '987-654-3210',
    role: 'Photographer',
    image: require('../../../../assets/photography.jpg')
  },
  {
    id: '3',
    name: 'Venue Service',
    description: 'Spacious venues for weddings, parties, and conferences. Elegant settings with customizable options.',
    status: 'Inactive',
    location: 'City C',
    rate: '$$$',
    phoneNumber: '456-789-0123',
    role: 'Venue Provider',
    image: require('../../../../assets/venue.jpg')
  },
  {
    id: '4',
    name: 'DJ Service',
    description: 'Get the party started with professional DJs and music. Custom playlists and lighting effects.',
    status: 'Active',
    location: 'City D',
    rate: '$$$',
    phoneNumber: '789-012-3456',
    role: 'DJ',
    image: require('../../../../assets/dj.jpg')
  }
];

const Services = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState(null);

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem} onPress={() => setSelectedService(item)}>
      <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>
          {item.description.split(' ').slice(0, 15).join(' ')}...
        </Text>
      </View>
    </TouchableOpacity>
  );

  const hireService = () => {
    if (selectedService) {
      console.log(`Hiring ${selectedService.name}`);
      setSelectedService(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}> </Text>
      <Text style={styles.text}> </Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />

      <Modal isVisible={selectedService !== null} onBackdropPress={() => setSelectedService(null)}>
        <View style={styles.modal}>
          <Image source={selectedService?.image} style={styles.modalImage} resizeMode="cover" />
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedService(null)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedService?.name}</Text>
            <Text style={styles.modalDescription}>{selectedService?.description}</Text>
            <View style={styles.modalDetails}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailText}>{selectedService?.status}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailText}>{selectedService?.location}</Text>
              </View>
            </View>
            <View style={styles.modalDetails}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Rate:</Text>
                <Text style={styles.detailText}>{selectedService?.rate}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Phone Number:</Text>
                <Text style={styles.detailText}>{selectedService?.phoneNumber}</Text>
              </View>
            </View>
            <View style={styles.modalDetails}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Role:</Text>
                <Text style={styles.detailText}>{selectedService?.role}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.hireButton} onPress={hireService}>
              <Text style={styles.hireButtonText}>Hire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  flatList: {
    paddingHorizontal: 5,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 200,
  },
  serviceInfo: {
    padding: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFC42B',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  detailColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  hireButton: {
    backgroundColor: '#FFC42B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  hireButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', 
  },
  text: {
    fontSize: 16,
    color: 'white', 
  },
});

export default Services;