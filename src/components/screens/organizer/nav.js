import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../Styles/style'; // Import your styles

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const tabScreenMapping = {
    Dashboard: 'Dashboard',
    Participant: 'Participant',
    Services: 'Services',
    Schedule: 'Schedule',
    About: 'About',
    Contact: 'Contact'
  };

  // Effect to update selectedTab based on route changes
  useEffect(() => {
    const currentRouteName = route.name;
    if (currentRouteName && tabScreenMapping[currentRouteName] && selectedTab !== currentRouteName) {
      setSelectedTab(currentRouteName);
    }
  }, [route, tabScreenMapping]);

  // Handle tab press
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    const screenName = tabScreenMapping[tab];
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  // Define tabs
  const tabs = [
    { name: 'Dashboard', icon: 'home' },
    { name: 'Participant', icon: 'person' },
    { name: 'Services', icon: 'construct' },
    { name: 'Schedule', icon: 'time' },
    { name: 'About', icon: 'information-circle' },
    { name: 'Contact', icon: 'call' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.iconContainer,
            selectedTab === tab.name && styles.selectedContainer,
          ]}
          onPress={() => handleTabPress(tab.name)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={selectedTab === tab.name ? 'black' : 'white'}
          />
          <Text
            style={[
              styles.iconText,
              { color: selectedTab === tab.name ? 'black' : 'white' },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavBar;
