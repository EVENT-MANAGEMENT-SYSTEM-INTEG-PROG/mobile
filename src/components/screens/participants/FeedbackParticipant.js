import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import CustomHeader from "../../elements/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const FeedbackParticipant = () => {
  const navigation = useNavigation();
  const [defaultRating, setDefaultRating] = useState(2);
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
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => alert(defaultRating)}
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
