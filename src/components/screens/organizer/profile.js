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
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

const Profile = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({
    name: 'Organizer',
    username: 'Organizer',
    email: 'eventO@example.com',
    phoneNumber: '123-456-7890',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [editing, setEditing] = useState(false);

  const handleSaveProfile = () => {
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {/* Burger icon to open sidebar */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
      
      <Image
        source={require('../../../../assets/profile-picture.jpg')}
        style={styles.profilePicture}
      />
      
      <View style={styles.profileContainer}>
        <Text style={styles.nameText}>{profile.name}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={profile.username}
            onChangeText={(text) => setProfile({ ...profile, username: text })}
            editable={false}
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
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={profile.phoneNumber}
            onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
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
                value={profile.currentPassword}
                onChangeText={(text) => setProfile({ ...profile, currentPassword: text })}
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
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          
        </View>
        
      </View>

      <NavBar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
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