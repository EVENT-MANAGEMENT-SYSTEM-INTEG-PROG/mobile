
// sidebar.js (CustomDrawerContent)

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles/style';
import logo from '../../../../assets/logo.png';

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  
  const DrawerItem = ({ icon, label, screenName }) => (
  <TouchableOpacity
  style={[
  styles.drawerItem,
  screenName === selectedItem && { backgroundColor: '#FFC42B' },
  ]}
  onPress={() => {
  if (screenName === 'Events') {
  navigation.navigate('MyEventScreen'); 
  setSelectedItem(screenName); 
  } else {
  navigation.navigate(screenName);
  setSelectedItem(screenName);
  }
  }}
  >
  <Ionicons
  name={icon}
  size={24}
  color={screenName === selectedItem ? 'black' : 'white'}
  style={styles.drawerIcon}
  />
  <Text style={[styles.drawerItemText, { color: screenName === selectedItem ? 'black' : 'white' }]}>
  {label}
  </Text>
  </TouchableOpacity>
  );
  
  return (
  <View style={styles.drawerContent}>
  <View style={styles.drawerHeader}>
  <Image source={logo} style={styles.logo} />
  </View>
    <View style={styles.drawerSeparator} />
    <DrawerItem icon="person-circle" label="Profile" screenName="Profile" />
    <DrawerItem icon="grid" label="Dashboard" screenName="Dashboard" />
    <DrawerItem icon="notifications" label="Notification" screenName="Notifications" />
    <DrawerItem icon="calendar" label="My Events" screenName="Events" />
    <DrawerItem icon="person" label="Attendee Tracker" screenName="Attendees" />
    <DrawerItem icon="archive" label="Inventory Tracker" screenName="Inventory" />
    <DrawerItem icon="wallet" label="Budget" screenName="Budget" />
    <DrawerItem icon="chatbubble-ellipses" label="Feedback" screenName="Feedback" />
    <DrawerItem icon="settings" label="Settings" screenName="Settings" />
  </View>
  );
  };
  
  export default CustomDrawerContent;