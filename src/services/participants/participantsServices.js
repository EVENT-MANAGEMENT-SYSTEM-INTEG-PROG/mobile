// src/services/participantServices.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../constants/constants';

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

export const getRegistration = async () => {
    try {
        const response = await api.get('/registration');
        return response.data;
    } catch (error) {
        console.error('Get participants error:', error);
        throw error;
    }
};

// export const fetchRegistrations = async (userId, date) => {
//     try {
//       const response = await axios.get('/api/registrations', {
//         params: {
//           user_id: userId,
//           date: moment(date).format('YYYY-MM-DD'),
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching registrations:', error);
//       throw error;
//     }
//   };


export const getRegistrationById = async (id) => {
    try {
        const response = await api.get(`/registration/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get participant by ID error:', error);
        throw error;
    }
};

export const createRegistration = async (participantData) => {
    try {
        const response = await api.post('/registration', participantData);
        return response.data;
    } catch (error) {
        console.error('Create participant error:', error);
        throw error;
    }
};

export const updateRegistration = async (id, participantData) => {
    try {
        const response = await api.patch(`/registration/${id}`, participantData);
        return response.data;
    } catch (error) {
        console.error('Update participant error:', error);
        throw error;
    }
};

export const deleteRegistration = async (id) => {
    try {
        await api.delete(`/registration/${id}`);
    } catch (error) {
        console.error('Delete participant error:', error);
        throw error;
    }
};
