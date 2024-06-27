import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import NavBar from './nav';
import { createEvent } from '../../../services/organizer/organizerServices'; // Adjust the import path as needed
import { getUser } from '../../../services/authentication/authServices';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import * as FileSystem from 'expo-file-system'; // Import expo-file-system
import { useFocusEffect } from '@react-navigation/native';

const Create = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [participants, setParticipants] = useState('');
  const [eventImage, setEventImage] = useState(null); // State for storing the selected image URI
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setOrganizer(`${userData.first_name} ${userData.last_name}`);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  const handleCreateEvent = async () => {
    try {
      setIsLoading(true); // Start loading indicator

      const participantsArray = participants.split(',').map(email => email.trim());
      let base64Image = null;

      if (eventImage) {
        const imageUri = eventImage.uri;
        const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        base64Image = `data:image/jpeg;base64,${imageBase64}`;
      }

      const eventData = {
        event_name: eventName,
        event_description: eventDescription,
        event_date: eventDate,
        event_time: eventTime,
        event_location: eventLocation,
        event_status: 'Upcoming',
        organizer: organizer,
        participants: participantsArray,
        event_image: base64Image,
      };

      await createEvent(eventData);
      setIsLoading(false); // Stop loading indicator on success
      Alert.alert('Success', 'Event created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      resetForm();
    } catch (error) {
      console.error('Event creation error:', error);
      setIsLoading(false); // Stop loading indicator on error
      Alert.alert('Error', 'Failed to create event');
    }
  };

  const resetForm = () => {
    setEventName("");
    setEventDescription("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setParticipants("");
    setEventImage(null); // Reset image state
  };

  const handleImageUpload = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission to access media library is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setEventImage({ uri: pickerResult.assets[0].uri }); // Use pickerResult.assets[0].uri
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
      Alert.alert('Error', 'Failed to pick an image');
    }
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this value if necessary
      >
        {/* Burger icon to open sidebar */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 15, marginBottom: 60 }}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFC42B" />
            </View>
          )}
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name"
              placeholderTextColor="#888"
              value={eventName}
              onChangeText={setEventName}
            />

            {/* Add image upload */}
            <TouchableOpacity onPress={handleImageUpload} style={styles.imagePicker}>
              {eventImage ? (
                <Image source={{ uri: eventImage.uri }} style={styles.eventImage} />
              ) : (
                <Text style={styles.imagePickerText}>Select Event Image</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Event Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Description"
              placeholderTextColor="#888"
              value={eventDescription}
              onChangeText={setEventDescription}
            />

            <Text style={styles.label}>Event Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#888"
              value={eventDate}
              onChangeText={setEventDate}
            />

            <Text style={styles.label}>Event Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM:SS"
              placeholderTextColor="#888"
              value={eventTime}
              onChangeText={setEventTime}
            />

            <Text style={styles.label}>Event Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Location"
              placeholderTextColor="#888"
              value={eventLocation}
              onChangeText={setEventLocation}
            />

            <Text style={styles.label}>Organizer</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Organizer Name"
              placeholderTextColor="#888"
              value={organizer}
              onChangeText={setOrganizer}
              editable={false} // Prevent editing if needed
            />

            <Text style={styles.label}>Participants (comma-separated emails)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Participant Emails"
              placeholderTextColor="#888"
              value={participants}
              onChangeText={setParticipants}
            />

            <Button
              title="Create Event"
              onPress={handleCreateEvent}
              color="#FFC42B"
            />
          </View>
        </ScrollView>

        <NavBar />
      </KeyboardAvoidingView>
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
  formContainer: {
    marginTop: 50,
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
    marginBottom: 10,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#FFC42B',
    fontSize: 16,
    marginBottom: 10,
  },
  eventImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default Create;