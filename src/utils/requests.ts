import api from "../api/axios";

// Example type — update based on your backend response structure

export const getUsers = async (): Promise<User[]> => { // Return type
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