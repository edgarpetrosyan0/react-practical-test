import api from "../api/axios";

// Example type — update based on your backend response structure
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar:string

  // "id": 7,
  // "email": "michael.lawson@reqres.in",
  // "first_name": "Michael",
  // "last_name": "Lawson",
  // "avatar": "https://reqres.in/img/faces/7-image.jpg"
}

export const getUsers = async (): Promise<User[]> => {
  try {
      const response = await api.get('/users');
      console.log(response.data);
      return response.data.data;
  } catch (error) {
      console.error('Failed to get users:', error);
      throw error; 
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
      const response = await api.get(`/users/${id}`);
      return response.data.data;
  } catch (error) {
      console.error(`Failed to get user ${id}:`, error);
      throw error;
  }
};