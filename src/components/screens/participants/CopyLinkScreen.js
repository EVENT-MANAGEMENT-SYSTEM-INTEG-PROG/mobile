import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import Material Community Icons
import CustomHeader from "../../elements/CustomHeader";
import { useNavigation, useRoute } from "@react-navigation/native";

const CopyLinkScreen = () => {
  const navigation = useNavigation();
  const eventLink = "eventwise.com/S9X8Hsjhj243FNSWks"; // Replace with your actual event code

  return (
    <ImageBackground style={styles.background}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          Share this link with people that you want to invite:
        </Text>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => {
            /* Logic to copy the link */
          }}
        >
          <Text style={styles.link}>{eventLink}</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <Text style={styles.subtitle}>Share your code via:</Text>
        <View style={styles.iconContainer}>
          {/* Replace onPress with actual share logic */}
          <MaterialCommunityIcons
            name="skype"
            size={36}
            color="#fff"
            onPress={() => {}}
          />
          <MaterialCommunityIcons
            name="twitter"
            size={36}
            color="#fff"
            onPress={() => {}}
          />
          <MaterialCommunityIcons
            name="facebook"
            size={36}
            color="#fff"
            onPress={() => {}}
          />
          <MaterialCommunityIcons
            name="whatsapp"
            size={36}
            color="#fff"
            onPress={() => {}}
          />
          <MaterialCommunityIcons
            name="linkedin"
            size={36}
            color="#fff"
            onPress={() => {}}
          />
        </View>
      </View>
    </ImageBackground>
  );
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
  title: {
    color: "#fff", // Customize text color
    fontSize: 18,
    marginBottom: 16,
  },
  linkContainer: {
    backgroundColor: "#333", // Customize link container background color
    padding: 10,
    borderRadius: 8,
  },
  link: {
    color: "#fff", // Customize link text color
    fontSize: 16,
  },
  orText: {
    color: "#fff", // Customize OR text color
    fontSize: 16,
    marginVertical: 16,
  },
  subtitle: {
    color: "#fff", // Customize subtitle text color
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default CopyLinkScreen;
