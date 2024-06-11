import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Important for Sanctum
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPatients = () => API.get('/patients');
export const createPatient = (patient) => API.post('/patients', patient);
export const login = (credentials) => API.post('/login', credentials);
export const getPatient = (id) => API.get(`/patients/${id}`);
export const updatePatient = (id, patient) => API.put(`/patients/${id}`, patient);
export const register = (userData) => API.post('/register', userData);
export const deletePatient = (id) => API.delete(`/patients/${id}`);


// export const getCsrfCookie = () => axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

export default API;
