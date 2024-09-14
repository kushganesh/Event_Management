import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all events
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Create new event
export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/events/create`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Register User
export const registerUser = async (userData) => {
  await axios.post(`${API_URL}/users/register`, userData);
};

// Login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  localStorage.setItem('token', response.data.token);
};
