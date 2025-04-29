import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "x-api-key": process.env.REACT_APP_API_KEY, 
  },
});

// Add Authorization token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request error:', error.message);
  return Promise.reject(error);
});

// Handle global error
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    let status = error.response?.status;
    let message = error.response?.data?.message || error.message;

    if (!status && error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error(`API Error [${status}]:`, message);

      if (status === 401) {
        console.error('Unauthorized');
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
    }
    return Promise.reject({status, message});
  }
);

export default api;
