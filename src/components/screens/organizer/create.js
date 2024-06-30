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
import { AntDesign } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import NavBar from './nav';
import { createEvent } from '../../../services/organizer/organizerServices';
import { checkConflict } from '../../../services/organizer/organizerServices'; // Adjust the import path as needed
import { getUser } from '../../../services/authentication/authServices';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import * as FileSystem from 'expo-file-system'; // Import expo-file-system
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select'; // Import react-native-picker-select
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

const Create = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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

        // Prepare event data
        const participantsArray = participants.split(',').map(email => email.trim());
        let base64Image = null;

        if (eventImage) {
            const imageUri = eventImage.uri;
            const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
            base64Image = `data:image/jpeg;base64,${imageBase64}`;
        }

        const formattedDate = eventDate ? eventDate.toISOString().split('T')[0] : null;
        const formattedTime = eventTime
            ? `${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}:00`
            : null;

        const eventData = {
            event_name: eventName,
            event_description: eventDescription,
            event_date: formattedDate,
            event_time: formattedTime, // Ensure event_time is included
            event_location: eventLocation,
            event_status: 'Upcoming',
            organizer: organizer,
            participants: participantsArray,
            event_image: base64Image,
        };

        // Check for date conflicts only
        const conflictResponse = await checkConflict({
            event_date: eventData.event_date
        });

        if (conflictResponse.conflict) {
            throw new Error('The selected date is already scheduled.');
        }

        // Proceed with event creation if no conflict
        await createEvent(eventData);
        setIsLoading(false); // Stop loading indicator
        Alert.alert('Success', 'Event created successfully', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
        resetForm();
    } catch (error) {
        console.error('Event creation error:', error.response ? error.response.data : error.message);
        setIsLoading(false); // Stop loading indicator on error

        // Determine the appropriate error message
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message;

        // Set custom title for conflict errors
        const alertTitle = errorMessage === 'The selected date is already scheduled.' ? 'Creation Failed' : 'Error';

        Alert.alert(alertTitle, errorMessage || 'Failed to create event');
    }
};


    const resetForm = () => {
      setEventName('');
      setEventDescription('');
      setEventDate(null);
      setEventTime(null);
      setEventLocation('');
      setParticipants('');
      setEventImage(null);
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios');
    setEventDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(Platform.OS === 'ios');
    setEventTime(currentTime);
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <AntDesign name="arrowleft" size={32} color="white" />
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 15, marginBottom: 60 }}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFC42B" />
            </View>
          )}
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Event Name</Text>
            <RNPickerSelect
              onValueChange={(value) => setEventName(value)}
              items={[
                { label: 'Birthday', value: 'Birthday' },
                { label: 'Summit', value: 'Summit' },
                { label: 'Reunion', value: 'Reunion' },
                { label: 'Concert', value: 'Concert' },
                { label: 'Festival', value: 'Festival' },
                { label: 'Wedding', value: 'Wedding' },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select an event type...', value: null }}
              value={eventName}
            />

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
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
              <Text style={styles.datePickerText}>
                {eventDate ? eventDate.toISOString().split('T')[0] : 'Pick a date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={eventDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>Event Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.datePicker}>
              <Text style={styles.datePickerText}>
                {eventTime ? eventTime.toTimeString().split(' ')[0] : 'Pick a time'}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={eventTime || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

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
              editable={false}
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
  datePicker: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#FFF',
    fontSize: 14,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    color: '#FFF',
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    color: '#FFF',
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: '#333',
  },
});

export default Create;
