import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  onChangeSearch,
  searchQuery,
  BackHandler
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import { Searchbar } from "react-native-paper";
import Scrollview from "../../elements/ScrollViewScreens";
import { getEvents } from "../../../services/organizer/organizerServices";
import { getUser } from '../../../services/authentication/authServices';
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [user_name, setUsername] = useState("");
  const [country, setCountry] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setUsername(userData.user_name); // Assuming the user object contains a username property
      setCountry(userData.country); // Assuming the user object contains a location property
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Do nothing when the back button is pressed
      return true;
    });

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, []);


  const colors = ["#FF6961", "#AEC6CF", "#FDFD96", "#77DD77"];
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.photoContainer}>
              <Button
                title="+"
                onPress={() => {}}
                style={styles.addPhotoButton}
              />
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.nameText}>{user_name}</Text>
            </View>
          </View>
          <Text style={styles.locationText}>{country}</Text>
        </View>
        <Searchbar
          placeholder="Search Events"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Events</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <Scrollview />
        <View style={styles.chooseEventSection}>
          <Text style={styles.sectionTitle}>Choose Event</Text>
          <View style={styles.eventTypes}>
            {eventTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.eventTypeButton,
                  { backgroundColor: colors[index % colors.length] },
                ]}
              >
                <Text style={styles.eventTypeButtonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.featuredEventCard}>
          <Image
            source={featuredEvent.image}
            style={styles.featuredEventImage}
          />
          <View style={styles.featuredEventInfo}>
            <Text style={styles.featuredEventTitle}>{featuredEvent.title}</Text>
            <Text style={styles.featuredEventDate}>{featuredEvent.date}</Text>
            <Text style={styles.featuredEventLocation}>
              {featuredEvent.location}
            </Text>
          </View>
        </View>
        <View style={styles.margintop}></View>
      </ScrollView>
    </ImageBackground>
  );
}

const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut"];

const featuredEvent = {
  image: require("../../../../assets/participants_images/pageant.jpeg"),
  title: "Mr. & Mrs. Ambot Lang 2024",
  date: "25 July, 24",
  location: "Luxxe Hotel",
};

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addPhotoButton: {
    fontSize: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: "white",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  locationText: {
    fontSize: 14,
    color: "#FFC700",
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  viewAllText: {
    fontSize: 14,
    color: "#FFC700",
  },
  eventsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 30,
    marginRight: 10,
    alignItems: "center",
    width: 200,
  },
  eventImageContainer: {
    position: "relative",
    width: "100%",
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  addEventButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FFC700",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addEventButtonText: {
    color: "#000",
    fontSize: 18,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  eventDate: {
    fontSize: 13,
    color: "#555",
  },
  eventLocation: {
    fontSize: 13,
    color: "#555",
  },
  chooseEventSection: {
    marginBottom: 20,
  },
  eventTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  eventTypeButton: {
    backgroundColor: "#FFC700",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  eventTypeButtonText: {
    color: "#333",
    fontSize: 14,
  },
  featuredEventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  featuredEventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  featuredEventInfo: {
    flex: 1,
  },
  featuredEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  featuredEventDate: {
    fontSize: 14,
    color: "#555",
  },
  featuredEventLocation: {
    fontSize: 14,
    color: "#555",
  },
  screenContainer: {
    flex: 1,
    // Other styles for your screen container
  },
  margintop: { marginTop: 160 },
});
