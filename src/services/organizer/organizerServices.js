import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/constants';
import moment from 'moment';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getEvents = async () => {
    try {
        const response = await api.get('/event');
        return response.data;
    } catch (error) {
        console.error('Get events error:', error);
        throw error;
    }
};

export const getEventById = async (id) => {
    try {
        const response = await api.get(`/event/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get event by ID error:', error);
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/event', eventData);
        return response.data;
    } catch (error) {
        console.error('Create event error:', error);
        throw error;
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const response = await api.patch(`/event/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Update event error:', error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        await api.delete(`/event/${id}`);
    } catch (error) {
        console.error('Delete event error:', error);
        throw error;
    }
};

export const notifyParticipants = async (id) => {
    try {
        const response = await api.post(`/event/${id}/notify`);
        return response.data;
    } catch (error) {
        console.error('Notify participants error:', error);
        throw error;
    }
};

export const checkConflict = async (eventData) => {
    try {
        const response = await api.post('/event/check-conflict', {
            event_date: eventData.event_date
        });
        return response.data;
    } catch (error) {
        console.error('Check conflict error:', error);
        throw error;
    }
};



// export const createSchedule = async (scheduleData) => {
//     try {
//         // Format the scheduleDate to MySQL compatible format (YYYY-MM-DD)
//         const formattedScheduleData = {
//             ...scheduleData,
//             scheduleDate: moment(scheduleData.scheduleDate).format('YYYY-MM-DD')
//         };
//         const response = await api.post('/schedule/create', formattedScheduleData);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating schedule:', error);
//         throw error;
//     }
// };
  

// export const fetchSchedule = async (date) => {
//     try {
//         const response = await api.get('/schedule/search', {
//             params: { date: moment(date).format('YYYY-MM-DD') }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching schedule:', error);
//         throw error;
//     }
// };


// export const fetchSchedules = async () => {
//     try {
//         const response = await api.get('/schedule');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching schedule:', error);
//         throw error;
//     }
// };

