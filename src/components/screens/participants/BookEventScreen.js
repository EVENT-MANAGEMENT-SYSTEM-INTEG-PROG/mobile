import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";

const BookEventScreen = () => {
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState([50000, 1000000]);
  const [sliderValues, setSliderValues] = useState(budget);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");
  const [peopleToInvite, setPeopleToInvite] = useState("");
  const navigation = useNavigation();
  const navigator = useNavigation();

  const saveEvent = async () => {
    if (
      !eventName ||
      !eventType ||
      !selectedDate ||
      !description ||
      !venueLocation ||
      !invitationMessage ||
      !peopleToInvite
    ) {
      showToast("Please fill in all the details.");
      return;
    }

    const bookedEvent = {
      eventType,
      eventName,
      eventDate: selectedDate,
      eventLocation: venueLocation,
      description,
      budget,
      invitationMessage,
      peopleToInvite,
    };

    try {
      await AsyncStorage.setItem(eventName, JSON.stringify(bookedEvent));
      navigation.navigate("EventDetails", { eventName: eventName });
    } catch (e) {
      console.error("Error saving event:", e);
      showToast("Failed to save event.");
    }
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const formatNumber = (number) => {
    if (typeof number === "number") {
      return number.toLocaleString();
    }
    return "";
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleSliderValueChange = (values) => {
    setSliderValues(values);
    setBudget(values);
  };

  return (
    <ImageBackground style={styles.eventCreationPage}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigator.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, marginHorizontal: 20 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Book Event</Text>
          </View>
          <View style={styles.eventTypeContainer}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.eventTypeButtonContainer}
            >
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Wedding" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Wedding")}
              >
                <Text style={styles.eventTypeText}>Wedding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Birthday" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Birthday")}
              >
                <Text style={styles.eventTypeText}>Birthday</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Reunion" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Reunion")}
              >
                <Text style={styles.eventTypeText}>Reunion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Debut" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Debut")}
              >
                <Text style={styles.eventTypeText}>Debut</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "KidsParty" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("KidsParty")}
              >
                <Text style={styles.eventTypeText}>Kid's Party</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Valentines" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Valentines")}
              >
                <Text style={styles.eventTypeText}>Valentines</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Christmas" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Christmas")}
              >
                <Text style={styles.eventTypeText}>Christmas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Alumni" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Alumni")}
              >
                <Text style={styles.eventTypeText}>Alumni</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eventTypeButton,
                  eventType === "Party" && styles.selectedEventTypeButton,
                ]}
                onPress={() => setEventType("Party")}
              >
                <Text style={styles.eventTypeText}>Party</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Venue Location"
              multiline
              value={venueLocation}
              onChangeText={setVenueLocation}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Invitation Message"
              multiline
              value={invitationMessage}
              onChangeText={setInvitationMessage}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="People to invite (e.g. random@gmail.com, random2@gmail.com)"
              multiline
              value={peopleToInvite}
              onChangeText={setPeopleToInvite}
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={toggleCalendar}
            >
              <Text style={styles.calendarButtonText}>
                Choose from calendar (EVENT DATE)
              </Text>
            </TouchableOpacity>
            {isCalendarVisible && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleDateChange}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      marked: true,
                      selectedColor: "#e6b800",
                    },
                  }}
                  theme={{
                    backgroundColor: "#23232e",
                    calendarBackground: "#23232e",
                    textSectionTitleColor: "#cdb6c1",
                    selectedDayBackgroundColor: "#e6b800",
                    selectedDayTextColor: "#23232e",
                    todayTextColor: "#e6b800",
                    dayTextColor: "#fff",
                    textDisabledColor: "#424242",
                    dotColor: "#e6b800",
                    selectedDotColor: "#23232e",
                    arrowColor: "#e6b800",
                  }}
                />
              </View>
            )}
            {selectedDate && (
              <View style={styles.formGroup}>
                <Text
                  style={{
                    color: "white",
                    marginTop: 10,
                    alignSelf: "center",
                    fontSize: 16,
                  }}
                >
                  SELECTED DATE:
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginTop: 10,
                    alignSelf: "center",
                    backgroundColor: "gray",
                    padding: 8,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {selectedDate}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetText}>SELECT BUDGET PRICE RANGE:</Text>
              <View style={styles.budgetPrices}>
                <Text style={styles.budgetPrice}>
                  {formatNumber(sliderValues[0])}
                </Text>
                <View style={styles.budgetArrowContainer}>
                  <Icon name="long-arrow-right" size={20} color="#fff" />
                </View>
                <Text style={styles.budgetPrice}>
                  {formatNumber(sliderValues[1])}
                </Text>
              </View>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={50000}
              maximumValue={1000000}
              step={50000}
              value={sliderValues[0]}
              onValueChange={(value) =>
                handleSliderValueChange([value, sliderValues[1]])
              }
              thumbTintColor="#e6b800"
              minimumTrackTintColor="#e6b800"
              maximumTrackTintColor="#777"
            />
            <Slider
              style={styles.slider}
              minimumValue={50000}
              maximumValue={1000000}
              step={50000}
              value={sliderValues[1]}
              onValueChange={(value) =>
                handleSliderValueChange([sliderValues[0], value])
              }
              thumbTintColor="#e6b800"
              minimumTrackTintColor="#e6b800"
              maximumTrackTintColor="#777"
            />
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={saveEvent}>
            <Text style={styles.bookButtonText}>Book Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  eventCreationPage: {
    backgroundColor: "black",
  },
  goBackButton: {
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 5,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#FFC42B",
    fontSize: 24,
    fontWeight: "bold",
  },
  eventTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  eventTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    marginHorizontal: 3,
  },
  eventTypeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  selectedEventTypeButton: {
    backgroundColor: "#FFC42B",
  },
  eventTypeText: {
    color: "#fff",
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  calendarButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 2,
  },
  calendarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  budgetText: {
    color: "#fff",
    fontSize: 16,
    alignItems: "center",
  },
  budgetContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  budgetPrices: {
    alignItems: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  budgetPrice: {
    color: "white",
    marginHorizontal: 8,
    fontSize: 16,
    alignItems: "center",
  },
  budgetArrowContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    width: "100%",
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  bookButton: {
    backgroundColor: "#FFC42B",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 110,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookEventScreen;
