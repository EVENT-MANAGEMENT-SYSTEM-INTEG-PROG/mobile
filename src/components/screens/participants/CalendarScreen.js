import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal, // Import Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Swiper from "react-native-swiper";
import CustomHeader from "../../elements/CustomHeader";
import { getUser } from "../../../services/authentication/authServices";
import { getRegistration } from "../../../services/participants/participantsServices";
import { getEventById } from "../../../services/organizer/organizerServices";

const { width } = Dimensions.get("window");

export default function CalendarScreen() {
  const navigation = useNavigation();
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchUserAndRegistrations = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      const formattedDate = moment(value).format('YYYY-MM-DD');
      const data = await getRegistration({ date: formattedDate, user_id: user.user_id });

      const userRegistrations = data.filter(
        (registration) =>
          registration.user_id === user.user_id &&
          moment(registration.register_date).isSame(moment(value), 'day')
      );

      const eventDetailsPromises = userRegistrations.map(async (registration) => {
        const event = await getEventById(registration.event_id);
        return {
          ...registration,
          event_name: event.event_name,
          event_description: event.event_description,
          event_date: event.event_date,
          event_time: event.event_time,
          event_location: event.event_location,
          organizer: event.organizer,
        };
      });

      const updatedRegistrations = await Promise.all(eventDetailsPromises);

      setParticipants(updatedRegistrations);
    } catch (error) {
      console.error("Failed to fetch user or registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserAndRegistrations();
  }, [value]);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

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

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.screenContainer}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.container}>
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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Schedule</Text>
          </View>

          <View style={styles.picker}>
          <Swiper
  index={1}
  ref={swiper}
  loop={false}
  showsPagination={false}
  onIndexChanged={(index) => {
    if (index === 1) return;
    const newIndex = index - 1;
    const newWeek = week + newIndex;
    setWeek(newWeek);
    setValue(moment(value).add(newIndex, 'week').toDate());
    swiper.current.scrollTo(1, false);
  }}
>
  {weeks.map((dates, index) => (
    <View style={styles.itemRow} key={index}>
      {dates.map((item, dateIndex) => {
        const isActive = value.toDateString() === item.date.toDateString();
        return (
          <TouchableWithoutFeedback
            key={dateIndex}
            onPress={() => {
              setValue(item.date);
              setLoading(true);
            }}
          >
            <View
              style={[
                styles.item,
                isActive && {
                  backgroundColor: "#111",
                  borderColor: "#111",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemWeekday,
                  isActive && { color: "#fff" },
                ]}
              >
                {item.weekday}
              </Text>
              <Text
                style={[
                  styles.itemDate,
                  isActive && { color: "#fff" },
                ]}
              >
                {item.date.getDate()}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  ))}
</Swiper>

          </View>

          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={styles.subtitle}>{value.toDateString()}</Text>
            <View style={styles.placeholder}>
              <View style={styles.placeholderInset}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FFC42B" />
                ) : participants.length === 0 ? (
                  <Text style={styles.noEventsText}>No Events available</Text>
                ) : (
                  participants.map((participant, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.eventBox}
                      onPress={() => handleEventPress(participant)}
                    >
                      <Text style={styles.eventText}>{participant.event_name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          </View>

          {/* Event Details Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {selectedEvent && (
                  <>
                    <Text style={styles.modalTitle}>{selectedEvent.event_name}</Text>
                    <Text style={styles.modalDescription}>{selectedEvent.event_description}</Text>
                    <Text style={styles.modalDetail}>Date: {selectedEvent.event_date}</Text>
                    <Text style={styles.modalDetail}>Time: {selectedEvent.event_time}</Text>
                    <Text style={styles.modalDetail}>Location: {selectedEvent.event_location}</Text>
                    <Text style={styles.modalDetail}>Organizer: {selectedEvent.organizer}</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
          
        </View>
        <View style={styles.marginbot}></View>
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
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFC42B",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#848895",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingLeft: 16,
  },
  noEventsText: {
    fontSize: 18,
    color: "#FFC42B",
    textAlign: "center",
    width: "100%",
  },

  eventBox: {
    width: "100%",
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFC42B",
    borderRadius: 8,
    backgroundColor: "#111",
    alignItems: "flex-start",
  },
  eventText: {
    fontSize: 18,
    color: "#FFC42B",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#FFC42B",
    borderColor: "#FFC42B",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginTop: 100,
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
    color: "#FFC42B",
    textAlign: "center",
  },
  activeButtonText: {
    color: "black",
  },
  screenContainer: {
    flex: 1,
  },
  marginbot: { marginBottom: 80 },

  /** Modal */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 600,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFC42B",
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: "white",
  },
});
