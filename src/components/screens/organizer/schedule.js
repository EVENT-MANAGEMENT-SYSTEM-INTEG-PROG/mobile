import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import RNPickerSelect from 'react-native-picker-select';
import NavBar from './nav';
import { fetchSchedule, getEvents, createSchedule } from '../../../services/organizer/organizerServices';

const { width } = Dimensions.get('window');

const Schedule = () => {
  const navigation = useNavigation();
  const swiper = useRef(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [scheduleData, setScheduleData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      try {
        const data = await fetchSchedule(value);
        setScheduleData(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [value]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    loadEvents();
  }, []);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  const handleCreateSchedule = async () => {
    try {
      if (selectedEvent && value) {
        await createSchedule({ eventId: selectedEvent, scheduleDate: value });
        setModalVisible(false);
        setSelectedEvent(null);
        const data = await fetchSchedule(value);
        setScheduleData(data);
      } else {
        alert('Please select a date and event.');
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
      </View>

      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, 'week').toDate());
              swiper.current.scrollTo(1, false);
            }, 100);
          }}>
          {weeks.map((dates, index) => (
            <View style={styles.itemRow} key={`week-${index}`}>
              {dates.map((item, dateIndex) => {
                const isActive = value.toDateString() === item.date.toDateString();
                return (
                  <TouchableOpacity
                    key={`date-${dateIndex}`}
                    onPress={() => setValue(item.date)}
                    style={[
                      styles.item,
                      isActive && {
                        backgroundColor: '#111',
                        borderColor: '#111',
                      },
                    ]}>
                    <Text style={[styles.itemWeekday, isActive && { color: '#fff' }]}>
                      {item.weekday}
                    </Text>
                    <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>
                      {item.date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <Text style={styles.subtitle}>{value.toDateString()}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.placeholder}>
            {scheduleData.length > 0 ? (
              scheduleData.map((item) => (
                <View key={item.event.id} style={styles.scheduleItemContainer}>
                  <Text style={styles.eventName}>{item.event.event_name}</Text>
                  <Text style={styles.scheduleDetails}>{moment(item.schedule_date).format('YYYY-MM-DD')}   {item.event.event_time}</Text>
                  
                </View>
              ))
            ) : (
              <>
                <Text style={styles.noScheduleText}>No schedule available</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View style={styles.createBtn}>
                    <Text style={styles.btnText}>Create Schedule</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => handleTabPress('ViewSched')}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>View Full Calendar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Schedule</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedEvent(value)}
              items={events.map(event => ({ label: event.event_name, value: event.event_id }))}
              placeholder={{ label: 'Select an event...', value: null }}
              style={pickerSelectStyles}
            />
            {/* Display selected date */}
            <Text style={styles.scheduleDateLabel}>Schedule Date:</Text>
            <Text style={styles.scheduleDate}>{moment(value).format('YYYY-MM-DD')}</Text>
            <TouchableOpacity onPress={handleCreateSchedule}>
              <View style={styles.modalBtn}>
                <Text style={styles.btnText}>Create</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View style={[styles.modalBtn, styles.cancelBtn]}>
                <Text style={styles.btnText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
    marginTop: 50,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
    color: '#FFF',
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  scheduleItemContainer: {
    marginBottom: 10,
  },
  eventName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleDetails: {
    color: '#999',
    fontSize: 14,
  },
  noScheduleText: {
    color: '#999',
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#FFC42B',
    borderColor: '#FFC42B',
    marginTop: 10,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#FFC42B',
    borderColor: '#FFC42B',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#FFC42B',
    borderColor: '#FFC42B',
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#888',
    borderColor: '#888',
  },
  scheduleDateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  scheduleDate: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
    marginBottom: 10,
  },
});

export default Schedule;
