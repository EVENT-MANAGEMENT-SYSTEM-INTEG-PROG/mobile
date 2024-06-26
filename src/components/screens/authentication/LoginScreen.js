import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Platform,
  Image,
  View,
} from "react-native";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
  Text,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from "react-native-root-toast";
import { AuthContext } from "../../../services/authentication/authContext";
import { getUser } from "../../../services/authentication/authServices";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const LoginScreen = ( {navigation} ) => {
  const [HideEntry, setHideEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext); 

  const CustomIcon = ({ name, size = 24, color = "black" }) => {
    return <Icon name={name} size={size} color={color} />;
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (email === "" || password === "") {
        showToast("Please input required data");
        setIsError(true);
        return;
      }

      await signIn(email, password); // Use signIn from AuthContext to handle login
      showToast('Login successful');

      // Fetch user details after successful login
      const user = await getUser();
      
      // Navigate based on user's role
      navigateBasedOnRole(user.role_id);

      // Reset the form
      resetForm();
    } catch (error) {
      console.error('Login error:', error);
      showToast('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const navigateBasedOnRole = (role_id) => {
    try {
      if (role_id === 2) {
        console.log('Navigating to ParticipantsStack...');
        navigation.navigate("ParticipantsStack");
      } else if (role_id === 3) {
        console.log('Navigating to OrganizerStack...');
        navigation.navigate('OrganizerStack');
      } else {
        showToast('Role not recognized');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      showToast('An error occurred during navigation.');
    }
  };
  

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../../../../assets/authentication_images/backg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
            keyboardVerticalOffset={
              Platform.OS === "ios" ? 0 : -heightPercentageToDP("5%")
            }
          >
            <Image
              source={require("../../../../assets/authentication_images/logo1.png")}
              style={{
                ...styles.logo,
                width: 200,
                height: 300,
              }}
              resizeMode="contain"
            />
            <SafeAreaView style={styles.welcome}>
              <Text
                variant="headlineMedium"
                style={{
                  fontSize: widthPercentageToDP("6%"),
                  color: "#FFC42B",
                  marginBottom: heightPercentageToDP("1%"),
                  fontWeight: "bold",
                }}
              >
                EVENT{" "}
                <Text style={{ color: "white", fontWeight: "bold" }}>WISE</Text>
              </Text>
            </SafeAreaView>

            <SafeAreaView
              style={{ ...styles.input, gap: heightPercentageToDP("1%") }}
            >
              <TextInput
                style={styles.inputStyle}
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                inputMode="email"
                value={email}
                error={isError}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                theme={{
                  colors: {
                    primary: "#FFC42B",
                    text: "#FFC42B",
                    placeholder: "#FFC42B",
                  },
                }}
                left={<TextInput.Icon icon={() => <CustomIcon name="account" size={24} color="black" />} />}
              />
              <TextInput
                mode="outlined"
                style={styles.inputStyle}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={HideEntry}
                right={
                  <TextInput.Icon
                    onPress={toggleSecureEntry}
                    icon={!HideEntry ? "eye" : "eye-off"}
                  />
                }
                theme={{
                  colors: {
                    primary: "#FFC42B",
                    text: "#FFC42B",
                    placeholder: "#FFC42B",
                  },
                }}
                left={<TextInput.Icon icon={() => <CustomIcon name="lock" size={24} color="black" />} />}
              />
              <View style={styles.forgotPasswordContainer}>
                <Text style={{ color: "white" }}>Forgot Password? </Text>
                <Button
                  labelStyle={{ color: "#FFC42B" }}
                  onPress={() => {
                    navigation.navigate("AccountRecoveryScreen");
                  }}
                >
                  Recover
                </Button>
              </View>
              <Button
                style={{ ...styles.buttonStyle, backgroundColor: "#FFC42B" }}
                mode="contained-tonal"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                labelStyle={{ color: "black", fontWeight: "bold" }}
              >
                Login
              </Button>

              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                }}
              >
                <Text style={{ color: "white" }}>Don't have an account yet? </Text>
                <Button
                  mode="text"
                  labelStyle={{ color: "#FFC42B" }}
                  onPress={() => {
                    navigation.navigate("RegisterScreen");
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  Register Now
                </Button>
              </SafeAreaView>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </PaperProvider>
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
    paddingBottom: heightPercentageToDP("15%"),
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: heightPercentageToDP("1%"),
  },
  logo: {
    top: heightPercentageToDP("5%"),
  },
  welcome: {
    top: heightPercentageToDP("-5%"),
  },
  input: {
    marginBottom: heightPercentageToDP("12%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  buttonStyle: {
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("5%"),
    marginTop: heightPercentageToDP("-10%"),
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("10%"),
    marginTop: -15,
  },
});

export default LoginScreen;
