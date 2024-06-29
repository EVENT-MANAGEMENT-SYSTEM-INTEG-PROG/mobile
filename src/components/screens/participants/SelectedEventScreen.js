import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const SelectedEventScreen = ({ route }) => {
  const { name, date, description, image } = route.params;
  const navigation = useNavigation();

  const handleJoinPress = () => {
    navigation.navigate("BookEvent", { eventName: name }); // Pass event name as a parameter
  };

  const handleCopyLinkPress = () => {
    navigation.navigate("CopyLink");
  };

  return (
    <ImageBackground style={styles.background}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleJoinPress} style={styles.button}>
            <Text style={styles.buttonText}>Join Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCopyLinkPress}
            style={styles.button2}
          >
            <Text style={styles.buttonText}>Copy event link</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>DETAILS</Text>
          <Text style={styles.detailsText}>{description}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexGrow: 1,
    alignItems: "center",
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFC42B", // Customize the color
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  button2: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFC42B",
    marginBottom: 10,
  },
  detailsText: {
    color: "#ccc",
    textAlign: "justify",
  },
});

export default SelectedEventScreen;
