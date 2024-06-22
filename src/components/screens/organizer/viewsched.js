import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars'; 
import NavBar from './nav';

const ViewSched = () => {
  const navigation = useNavigation(); 

  const items = {
    '2024-06-18': [{ name: 'Meeting 1', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }],
    '2024-06-19': [{ name: 'Meeting 2', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }],
    '2024-06-20': [{ name: 'Meeting 3', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }],
    '2024-06-21': [{ name: 'Meeting 4', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }],
    '2024-06-22': [{ name: 'Meeting 5', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }],
    '2024-06-23': [{ name: 'Meeting 6', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.' }]
  };

  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}> </Text>
      <Text style={styles.text}> </Text>

      <SafeAreaView style={styles.agendaContainer}>
        <Agenda
          items={items}
          renderItem={(item, isFirst) => (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.data}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  agendaContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#FFD700',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ViewSched;