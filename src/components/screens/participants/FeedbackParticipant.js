import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createEvaluation } from "../../../services/participants/evaluationServices";
import { getUser } from "../../../services/authentication/authServices";

const FeedbackParticipant = ({ route }) => {
  const navigation = useNavigation();
  const { event_id } = route.params;
  const [user_id, setUser_id] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setUser_id(userData.user_id); // Assuming userData has user_id property
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    console.log("User ID:", user_id);
    console.log("Event ID:", event_id); 
  }, [user_id, event_id]);

  const [defaultRating, setDefaultRating] = useState(2);
  const [remarks, setRemarks] = useState("");
  const maxRating = [1, 2, 3, 4, 5];

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((item) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImgStyle}
              source={
                item <= defaultRating
                  ? { uri: starImgFilled }
                  : { uri: starImgCorner }
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmit = async () => {
    const evaluationData = {
      user_id: user_id,
      event_id,
      evaluation_rating: defaultRating,
      remarks,
      evaluation_status: "completed",
    };

    try {
      await createEvaluation(evaluationData);
      alert("Feedback submitted successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Failed to submit feedback: ${error.response.data.message}`);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    }
  };

  return (
    <ImageBackground style={styles.background}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.textStyle}>Please Rate Us</Text>
        <CustomRatingBar />
        <Text style={styles.textStylele}>
          {defaultRating + " / " + maxRating.length}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your remarks"
          placeholderTextColor="#ccc"
          value={remarks}
          onChangeText={setRemarks}
          multiline
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    marginBottom: 20,
    color: "white",
  },
  textStylele: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 15,
    color: "white",
  },
  customRatingBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginHorizontal: 5,
  },
  textInput: {
    width: '80%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#FFD700",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default FeedbackParticipant;
