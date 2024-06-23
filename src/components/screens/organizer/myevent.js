// myevent.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import NavBar from './nav';
import pic from '../../../../assets/organizer_images/pic.png';
import styles from '../../Styles/style';

const MyEventScreen = () => {
  const navigation = useNavigation(); 

  const navigateToEditScreen = () => {
    console.log('Navigating to EditScreen');
    navigation.navigate('EditScreen');
  };

  return (
    <LinearGradient
      colors={['#2A2600', '#000000']}
      style={{ flex: 1, paddingBottom: 30 }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topSection}>
          <Text style={[styles.text, { color: '#FFC42B' }]}>MY EVENT</Text>
          
          <TouchableOpacity style={styles.addButton} onPress={navigateToEditScreen}>
            <LinearGradient
              colors={['#FFC42B', '#7D7D7D']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>ADD EVENT INFORMATION</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <View style={styles.eventInfo} key={index}>
              <Image source={pic} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.eventTitle}>Mr. & Ms. Malik Wedding</Text>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.detailText}>June 30, 2024</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={20} color="black" style={styles.icon} />
                    <Text style={styles.detailText}>CDO</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={navigateToEditScreen}>
                  <LinearGradient
                    colors={['#FFC42B', '#FFC42B']}
                    style={[styles.buttonGradient, { borderRadius: 20 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <NavBar />
    </LinearGradient>
  );
};

export default MyEventScreen;
