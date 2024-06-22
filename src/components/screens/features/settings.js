import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the burger icon
import { useNavigation } from '@react-navigation/native';
import NavBar from './nav';

// Import NavBar component if needed

const Settings = () => {
  const navigation = useNavigation(); // Hook to use navigation

  const [profileSettings, setProfileSettings] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country'
  });

  const [systemSettings, setSystemSettings] = useState({
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'UTC'
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingSystem, setEditingSystem] = useState(false);

  const handleSaveProfile = () => {
    setEditingProfile(false);
    // Additional logic to save profile settings if needed
  };

  const handleSaveSystem = () => {
    setEditingSystem(false);
    // Additional logic to save system settings if needed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingProfile(true)}
            disabled={editingProfile}
          >
            <Text style={styles.settingLabel}>Username:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter username"
              value={profileSettings.username}
              onChangeText={(text) => setProfileSettings({ ...profileSettings, username: text })}
              editable={editingProfile}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingProfile(true)}
            disabled={editingProfile}
          >
            <Text style={styles.settingLabel}>Email:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter email"
              value={profileSettings.email}
              onChangeText={(text) => setProfileSettings({ ...profileSettings, email: text })}
              editable={editingProfile}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingProfile(true)}
            disabled={editingProfile}
          >
            <Text style={styles.settingLabel}>Phone Number:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter phone number"
              value={profileSettings.phoneNumber}
              onChangeText={(text) => setProfileSettings({ ...profileSettings, phoneNumber: text })}
              editable={editingProfile}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingProfile(true)}
            disabled={editingProfile}
          >
            <Text style={styles.settingLabel}>Address:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter address"
              value={profileSettings.address}
              onChangeText={(text) => setProfileSettings({ ...profileSettings, address: text })}
              editable={editingProfile}
            />
          </TouchableOpacity>
          {editingProfile && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setEditingProfile(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFC42B' }]}>System Settings</Text>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingSystem(true)}
            disabled={editingSystem}
          >
            <Text style={styles.settingLabel}>Language:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter language"
              value={systemSettings.language}
              onChangeText={(text) => setSystemSettings({ ...systemSettings, language: text })}
              editable={editingSystem}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingSystem(true)}
            disabled={editingSystem}
          >
            <Text style={styles.settingLabel}>Date Format:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter date format"
              value={systemSettings.dateFormat}
              onChangeText={(text) => setSystemSettings({ ...systemSettings, dateFormat: text })}
              editable={editingSystem}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={() => setEditingSystem(true)}
            disabled={editingSystem}
          >
            <Text style={styles.settingLabel}>Time Zone:</Text>
            <TextInput
              style={styles.settingInput}
              placeholder="Enter time zone"
              value={systemSettings.timeZone}
              onChangeText={(text) => setSystemSettings({ ...systemSettings, timeZone: text })}
              editable={editingSystem}
            />
          </TouchableOpacity>
          {editingSystem && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveSystem}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setEditingSystem(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Render the NavBar component if needed */}
      <NavBar />
    </View>
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
  content: {
    marginTop: 60, // Adjust this value as needed to create space below the menu button
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFC42B',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingInput: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    backgroundColor: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#FFC42B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default Settings;
