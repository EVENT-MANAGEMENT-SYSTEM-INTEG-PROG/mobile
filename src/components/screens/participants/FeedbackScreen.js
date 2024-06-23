import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const FeedbackScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground style={styles.background}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../../../assets/participants_images/festival.png")}
          style={styles.image}
        />
        <Text style={styles.title}>FEEDBACK</Text>
        <Text style={styles.subtitle}>How was your experience?</Text>

        <TextInput
          style={styles.input}
          placeholder="Type your feedback here..."
          multiline
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet. Vel dignissimos reiciendis ab
            voluptatibus dolorem eum voluptas sint et repellat animi aut
            voluptatem sunt. Qui ipsam rerum non quae quia aut quasi
            voluptatibus est quia exercitationem est dicta quibusdam. Ut quos
            quam At sint tenetur in voluptatum doloremque ad iusto distinctio ex
            voluptates magnam et necessitatibus quaerat.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginLeft: 200,
  },
  subtitle: {
    color: "#ccc",
  },
  detailsText: {
    color: "#ccc",
    textAlign: "justify",
  },
});

export default FeedbackScreen;
