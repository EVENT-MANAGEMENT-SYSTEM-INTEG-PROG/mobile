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

export default function BirthdayScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handlePress = (screen) => {
    navigation.navigate(screen, {
      animationEnabled: true,
      animationTypeForReplace: "push",
    });
  };

  return (
    <ImageBackground style={styles.background}>
      <View>
        <CustomHeader
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>BIRTHDAYS</Text>
        </View>
        <Searchbar
          placeholder="Search Events"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <CarouselView />
        <Cards />
        <View style={styles.marginbottom}></View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  searchBar: {
    marginBottom: 20,
  },
  title: {
    color: "#FFC42B",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 20,
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

  marginbottom: { marginBottom: 140 },
});
