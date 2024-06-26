import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles/style';
import logo from '../../../../assets/organizer_images/logo.png';
import { AuthContext } from '../../../services/authentication/authContext';

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const { signOut } = useContext(AuthContext);

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
      <Text
        style={[
          styles.drawerItemText,
          { color: screenName === selectedItem ? 'black' : 'white' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
      await signOut(); // Call logout function from authService.js
      navigation.navigate('LoginScreen'); // Navigate to LoginScreen upon successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error (if any)
    }
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.drawerSeparator} />
      <DrawerItem icon="person-circle" label="Profile" screenName="Profile" />
      <DrawerItem icon="grid" label="Dashboard" screenName="Dashboard" />
      <DrawerItem
        icon="notifications"
        label="Notification"
        screenName="Notifications"
      />
      <DrawerItem icon="calendar" label="My Events" screenName="Events" />
      <DrawerItem
        icon="person"
        label="Attendee Tracker"
        screenName="Attendees"
      />
      <DrawerItem
        icon="archive"
        label="Inventory Tracker"
        screenName="Inventory"
      />
      <DrawerItem icon="wallet" label="Budget" screenName="Budget" />
      <DrawerItem icon="chatbubble-ellipses" label="Feedback" screenName="Feedback" />
      <DrawerItem icon="settings" label="Settings" screenName="Settings" />
      <TouchableOpacity
        style={[styles.drawerItem, { backgroundColor: 'red' }]} // Red background color
        onPress={handleLogout} // Call handleLogout when pressed
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="white"
          style={styles.drawerIcon}
        />
        <Text style={[styles.drawerItemText, { color: 'white' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;
