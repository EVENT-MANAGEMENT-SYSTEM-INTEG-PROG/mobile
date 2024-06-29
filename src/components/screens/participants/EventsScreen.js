import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import CarouselView from "../../elements/CarouselView"; // Assuming this is a date selector carousel
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../elements/CustomHeader";
import Cards from "../../elements/Cards";

export default function EventsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  // Placeholder function to handle date selection or any other calendar actions

  const buttons = [
    { title: "Events", screen: "EventsStack" },
    { title: "Calendar", screen: "Calendar" },
    { title: "Joined Events", screen: "JoinedEvents" },
  ];

  const handlePress = (screen) => {
    navigation.navigate(screen, {
      animationEnabled: true,
      animationTypeForReplace: "push",
    });
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainer}>
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.screen}
              style={[
                styles.button,
                navigation.getState().routes[navigation.getState().index]
                  .name === button.screen
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handlePress(button.screen)}
            >
              <Text
                style={[
                  styles.buttonText,
                  navigation.getState().routes[navigation.getState().index]
                    .name === button.screen && styles.activeButtonText,
                ]}
              >
                {button.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Searchbar
          placeholder="Search Events"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <CarouselView />
        <Text style={styles.title}>EVENTS</Text>
          <Cards />
        <View style={styles.marginbottom}></View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    color: "#FFC42B",
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
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
  buttonText: {
    fontSize: 16,
    color: "#FFC42B", // Color for inactive buttons
    textAlign: "center",
  },
  activeButtonText: {
    color: "black", // Color for active button text
  },
  screenContainer: {
    flex: 1,
    // Other styles for your screen container
  },
  marginbottom: { marginBottom: 80 },
});
