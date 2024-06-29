import React, { useState } from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, View, Keyboard } from "react-native";
import { Text, Button, TextInput, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { signup } from "../../../services/authentication/authServices";

const RegisterScreen = () => {
  const navigator = useNavigation();
  const [user_name, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState(new Date());
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);
  const [mobile_number, setMobileNumber] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  const CustomIcon = ({ name = "account", size = 24, color = "black" }) => {
    return <Icon name={name} size={size} color={color} />;
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      if (
        user_name === "" ||
        first_name === "" ||
        last_name === "" ||
        gender === "" ||
        date_of_birth === "" ||
        country === "" ||
        email === "" ||
        password === "" ||
        mobile_number === ""
      ) {
        showToast("Please input required data");
        setIsError(true);
        return;
      }

      if (password !== repassword) {
        showToast("Passwords do not match");
        setIsError(true);
        return;
      }

      const userData = {
        user_name,
        first_name,
        last_name,
        gender,
        date_of_birth: date_of_birth.toISOString().split('T')[0],
        country,
        email,
        password,
        password_confirmation: repassword,
        role_id: 2, // Fixed role_id for PARTICIPANT
        mobile_number,
      };

      await signup(userData);

      showToast("Registration successful");

      Keyboard.dismiss();

      // Introduce a delay of 2 seconds (adjust the time as needed)
      setTimeout(() => {
        navigator.navigate("LoginScreen");
      }, 1000);

      // Reset the form
      resetForm();
    } catch (error) {
      console.error("Registration error:", error);
      showToast("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setGender("");
    setDateOfBirth(new Date());
    setCountry("");
    setEmail("");
    setPassword("");
    setRepassword("");
    setMobileNumber("");
    setIsError(false);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date_of_birth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  return (
    <ImageBackground source={require("../../../../assets/authentication_images/backg.png")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : heightPercentageToDP("10%")}
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.headerText}>REGISTER</Text>
            <PaperProvider>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="Username"
                  placeholder="Enter your username"
                  error={isError}
                  value={user_name}
                  onChangeText={(text) => setUsername(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="account" size={24} color="black" />} />}
                />
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="First Name"
                  placeholder="Enter your first name"
                  error={isError}
                  value={first_name}
                  onChangeText={(text) => setFirstName(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="account" size={24} color="black" />} />}
                />
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="Last Name"
                  placeholder="Enter your last name"
                  error={isError}
                  value={last_name}
                  onChangeText={(text) => setLastName(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="account" size={24} color="black" />} />}
                />
                <RNPickerSelect
                  onValueChange={(value) => setGender(value)}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Select your gender", value: null }}
                />
                <Button
                  onPress={() => setShowDatePicker(true)}
                  mode="outlined"
                  style={styles.datePickerButton}
                  labelStyle={{ color: "#000" }}
                >
                  {date_of_birth ? date_of_birth.toDateString() : "Select date of birth"}
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    value={date_of_birth}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                  />
                )}
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="Country"
                  placeholder="Enter your country"
                  error={isError}
                  value={country}
                  onChangeText={(text) => setCountry(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="earth" size={24} color="black" />} />}
                />
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="Email"
                  placeholder="Enter your email"
                  inputMode="email"
                  value={email}
                  error={isError}
                  onChangeText={(text) => setEmail(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="email" size={24} color="black" />} />}
                />
                <TextInput
                  style={styles.inputStyle}
                  mode="outlined"
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  inputMode="tel"
                  value={mobile_number}
                  error={isError}
                  onChangeText={(text) => setMobileNumber(text)}
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="phone" size={24} color="black" />} />}
                />
                <TextInput
                  mode="outlined"
                  style={styles.inputStyle}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={HideEntry}
                  error={isError}
                  right={
                    <TextInput.Icon
                      onPress={toggleSecureEntry}
                      icon={!HideEntry ? "eye" : "eye-off"}
                    />
                  }
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="lock" size={24} color="black" />} />}
                />
                <TextInput
                  mode="outlined"
                  style={styles.inputStyle}
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={repassword}
                  onChangeText={(text) => setRepassword(text)}
                  secureTextEntry={HideEntry}
                  error={isError}
                  right={
                    <TextInput.Icon
                      onPress={toggleSecureEntry}
                      icon={!HideEntry ? "eye" : "eye-off"}
                    />
                  }
                  theme={{
                    colors: {
                      primary: "#FFC42B",
                      text: "#000",
                      placeholder: "#FFC42B",
                      background: "#fff",
                    },
                  }}
                  left={<TextInput.Icon icon={() => <CustomIcon name="lock" size={24} color="black" />} />}
                />
                <Button
                  loading={loading}
                  disabled={loading}
                  style={styles.buttonStyle}
                  mode="contained"
                  onPress={handleRegistration}
                  labelStyle={{ color: "black", fontWeight: "bold" }}
                >
                  Create Account
                </Button>

                <SafeAreaView
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Already have an account?</Text>
                  <Button
                    labelStyle={{ color: "#FFC42B" }}
                    loading={loading}
                    disabled={loading}
                    onPress={() => navigator.navigate("LoginScreen")}
                  >
                    Login Now
                  </Button>
                </SafeAreaView>
              </View>
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    alignItems: "center",
    paddingVertical: heightPercentageToDP("5%"),
  },
  headerText: {
    marginTop: heightPercentageToDP("5%"),
    color: "#FFC42B",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#fff",
  },
  buttonStyle: {
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#FFC42B",
  },
  datePickerButton: {
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("2%"),
    borderColor: "#FFC42B",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#FFC42B",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#fff",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#FFC42B",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#fff",
  },
});

export default RegisterScreen;
