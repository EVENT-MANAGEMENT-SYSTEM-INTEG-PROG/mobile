// src/services/evaluationServices.js
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

export const getEvaluations = async () => {
    try {
        const response = await api.get('/evaluation');
        return response.data;
    } catch (error) {
        console.error('Get evaluations error:', error);
        throw error;
    }
};

export const getEvaluationById = async (id) => {
    try {
        const response = await api.get(`/evaluation/${id}`);
        return response.data;
    } catch (error) {
        console.error('Get evaluation by ID error:', error);
        throw error;
    }
};

export const createEvaluation = async (evaluationData) => {
    try {
        const response = await api.post('/evaluation', evaluationData);
        return response.data;
    } catch (error) {
        console.error('Create evaluation error:', error);
        throw error;
    }
};

export const updateEvaluation = async (id, evaluationData) => {
    try {
        const response = await api.patch(`/evaluation/${id}`, evaluationData);
        return response.data;
    } catch (error) {
        console.error('Update evaluation error:', error);
        throw error;
    }
};

export const deleteEvaluation = async (id) => {
    try {
        await api.delete(`/evaluation/${id}`);
    } catch (error) {
        console.error('Delete evaluation error:', error);
        throw error;
    }
};
