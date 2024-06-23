// create.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { Avatar, Provider as PaperProvider } from 'react-native-paper'; 
import NavBar from './nav';

const Create = () => {
  const navigation = useNavigation(); 

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Burger icon to open sidebar */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <Avatar.Image
            size={50}
            source={require('../../../../assets/organizer_images/pro_pic.png')}
            style={styles.profilePicture}
          />
          <View style={styles.welcomeUsername}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.usernameText}>Username</Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Cagayan de Oro</Text>
            <MaterialCommunityIcons
              name="map-marker"
              color="#FFC42B"
              size={23}
              style={styles.locationIcon}
            />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.label}>Venue Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Venue Location"
            placeholderTextColor="#888"
          />
        </View>

        <NavBar />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 80, // To provide space for the burger icon
  },
  profilePicture: {
    marginRight: 10,
  },
  welcomeUsername: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 'auto',
  },
  welcomeText: {
    fontSize: 12,
    color: '#FFF',
  },
  usernameText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#FFF',
    textDecorationLine: 'underline',
    marginRight: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  searchContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});

export default Create;