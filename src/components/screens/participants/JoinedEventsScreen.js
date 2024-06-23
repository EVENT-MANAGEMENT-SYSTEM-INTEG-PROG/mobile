import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../elements/CustomHeader";
import DeleteLeaveModal from "./ModalScreen";
import React, { useState } from "react";

const JoinedEventsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleLeaveEvent = () => {
    // Perform the leave event action
    // ...

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation();

  const buttons = [
    { title: "Events", screen: "EventsStack" },
    { title: "Calendar", screen: "Calendar" },
    { title: "Joined Events", screen: "JoinedEvents" },
  ];

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const events = [
    {
      id: "1",
      name: "SUNBURN FESTIVAL",
      date: "Jan. 21, 2024",
      details: "Lorem Ipsum dolor sit amet...",
    },
    {
      id: "2",
      name: "THE VOICE KIDS OF MISOR",
      date: "Jan. 16-21, 2024",
      details: "Lorem Ipsum dolor sit amet...",
    },
    {
      id: "3",
      name: "MESCON",
      date: "Sept. 10, 2024",
      details: "Lorem Ipsum dolor sit amet...",
    },
    {
      id: "4",
      name: "MISS BUGO",
      date: "Oct. 20, 2024",
      details: "Lorem Ipsum dolor sit amet...",
    },
    {
      id: "5",
      name: "REGGIE'S WEDDING",
      date: "Dec. 23, 2024",
      details: "Lorem Ipsum dolor sit amet...",
    },
  ];

  const handleFeedbackPress = () => {
    navigation.navigate("Feedback"); // Replace with the actual screen name
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader
          title="Your Screen Title"
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainerNav}>
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.screen}
              style={[
                styles.buttonNav,
                navigation.getState().routes[navigation.getState().index]
                  .name === button.screen
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handlePress(button.screen)}
            >
              <Text
                style={[
                  styles.buttonTextInactive,
                  navigation.getState().routes[navigation.getState().index]
                    .name === button.screen && styles.activeButtonText,
                ]}
              >
                {button.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventDetails}>{event.details}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleOpenModal}
                style={styles.buttonDelete}
              >
                <Text style={styles.buttonText}>LEAVE EVENT</Text>
              </TouchableOpacity>
              <DeleteLeaveModal
                visible={modalVisible}
                onLeave={handleLeaveEvent}
                onCancel={handleCancel}
              />
              <TouchableOpacity
                onPress={handleFeedbackPress}
                style={styles.button}
              >
                <Text style={styles.buttonText}>FEEDBACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.margintop}></View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 20 },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },

  eventCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f2f2f2", // Change as needed
    // Add more styling as needed
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "",
    // Add more styling as needed
  },
  eventDate: {
    fontSize: 14,
    // Add more styling as needed
  },
  eventDetails: {
    fontSize: 14,
    marginTop: 5,
    // Add more styling as needed
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // Add more styling as needed
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFC42B", // Change as needed
    // Add more styling as needed
  },
  buttonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "red", // Change as needed
    // Add more styling as needed
  },
  buttonText: {
    color: "#fff",
    // Add more styling as needed
  },
  buttonContainerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  buttonNav: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
  },
  activeButton: {
    backgroundColor: "#FFC42B",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  buttonTextInactive: {
    fontSize: 16,
    color: "#FFC42B", // Color for inactive buttons
    textAlign: "center",
  },
  activeButtonText: {
    color: "black", // Color for active button text
  },
  margintop: { marginTop: 140 },
});

export default JoinedEventsScreen;
