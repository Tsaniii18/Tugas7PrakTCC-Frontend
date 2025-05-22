import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

api.interceptors.request.use(async (config) => {
  if (config.url.includes('/login') || config.url.includes('/users')) {
    return config;
  }
  let accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    
    if (isExpired) {
      try {
        const response = await api.get('/token');
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        window.location.href = '/';
        return Promise.reject(error);
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else {
    window.location.href = '/';
    return Promise.reject(new Error('No access token'));
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const auth = (data) => api.post('/login', data);
export const register = (data) => api.post('/users', data);

export const getAllNotes = () => api.get('/note');
export const getNoteById = (id) => api.get(`/note/${id}`);
export const saveNote = (data) => api.post('/note', data);
export const updateNote = (id, data) => api.patch(`/note/${id}`, data);
export const deleteNote = (id) => api.delete(`/note/${id}`);