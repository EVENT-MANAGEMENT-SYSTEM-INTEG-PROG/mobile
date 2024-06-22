import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const Contact = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <View style={styles.overlay} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>CONTACT US</Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <View style={styles.row}>
            <TextInput
              style={styles.textInputHalf}
              placeholder="Name"
              placeholderTextColor="#A9A9A9"
            />
            <TextInput
              style={styles.textInputHalf}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.textInputHalf}
              placeholder="Phone Number"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <TextInput
            style={styles.messageInput}
            placeholder="Write us a message."
            multiline={true}
            placeholderTextColor="#A9A9A9"
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 80, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    textDecorationLine: 'underline',
  },
  form: {
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInputHalf: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 4,
    fontSize: 16,
    marginBottom: 16,
    height: 100,
  },
  submitButton: {
    backgroundColor: '#daa520',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Contact;