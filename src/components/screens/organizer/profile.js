import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import NavBar from './nav';
import Toast from 'react-native-root-toast';
import { getUser, updateAccount } from '../../../services/authentication/authServices';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    user_name: '',
    email: '',
    mobile_number: '',
    country: '',
    user_name: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getUser(); // Implement getUser function to fetch user data
      setProfile(userData); // Update profile state with fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, show error message, etc.
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // Implement updateAccount function to update user account
      await updateAccount(profile); // Assuming updateAccount accepts updated profile data
      setEditing(false);
      fetchUserData();
      showToast('Profile updated successfully'); // Show success toast
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile'); // Show failure toast
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };

  return (
    <>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {/* Burger icon to open sidebar */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        
        <Image
          source={require('../../../../assets/organizer_images/organizer_profle.png')}
          style={styles.profilePicture}
        />
        
        <View style={styles.profileContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>First name:</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={profile.first_name}
              onChangeText={(text) => setProfile({ ...profile, first_name: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Lastname:</Text>
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={profile.last_name}
              onChangeText={(text) => setProfile({ ...profile, last_name: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={profile.gender}
              onChangeText={(text) => setProfile({ ...profile, gender: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date of birth:</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of birth"
              value={profile.date_of_birth}
              onChangeText={(text) => setProfile({ ...profile, date_of_birth: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mobile Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={profile.mobile_number}
              onChangeText={(text) => setProfile({ ...profile, mobile_number: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Country:</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={profile.country}
              onChangeText={(text) => setProfile({ ...profile, country: text })}
              editable={editing}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={profile.user_name}
              onChangeText={(text) => setProfile({ ...profile, user_name: text })}
              editable={editing}
            />
          </View>
          {editing && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Current Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  value={profile.password}
                  onChangeText={(text) => setProfile({ ...profile, password: text })}
                  secureTextEntry={true}
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>New Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={profile.newPassword}
                  onChangeText={(text) => setProfile({ ...profile, newPassword: text })}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Confirm New Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm New Password"
                  value={profile.confirmNewPassword}
                  onChangeText={(text) => setProfile({ ...profile, confirmNewPassword: text })}
                  secureTextEntry={true}
                />
              </View>
            </>
          )}
          <View style={styles.buttonContainer}>
            {editing ? (
              <>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                  disabled={loading}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditing(true)}
                disabled={loading}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
            
          </View>
          
        </View>

        
      </ScrollView>
      
      <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
    marginBottom: 60,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 50,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC42B',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    backgroundColor: '#09090B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#FFC42B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FFC42B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#666',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default Profile;
