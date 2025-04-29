
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "x-api-key": process.env.REACT_APP_API_KEY, 
},
});

// Add Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global error cases
api.interceptors.response.use(
  (response) => response,
  (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
  
      if (status) {
        console.error(`API Error [${status}]:`, message);
      } else if (error.request) {
          console.error('Network Error:', error.message);
      } 
      return Promise.reject({status,message});
  }
);
export default api;