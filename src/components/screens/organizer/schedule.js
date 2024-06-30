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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import NavBar from './nav';
import { getEvents } from '../../../services/organizer/organizerServices';
import { ScrollView } from 'react-native-virtualized-view';

const { width } = Dimensions.get('window');

const Schedule = () => {
  const navigation = useNavigation();
  const swiper = useRef(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredEvents = events.filter(event =>
    moment(event.event_date).isSame(value, 'day')
  );

  return (
    <>
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

        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={styles.subtitle}>{value.toDateString()}</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.placeholder}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((item) => (
                    <View key={item.event_id} style={styles.scheduleItemContainer}>
                      <Text style={styles.eventName}>{item.event_name}</Text>
                      <Text style={styles.scheduleDetails}>
                        {moment(item.event_date).format('YYYY-MM-DD')} {item.event_time}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noScheduleText}>No schedule available</Text>
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
        </ScrollView>
      </View>
      <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#000',
    marginBottom: 60,
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
});

export default Schedule;