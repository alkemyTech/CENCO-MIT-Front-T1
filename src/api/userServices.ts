import apiClient from "./api";
import { User } from "../interfaces/User";

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/user/delete/${id}`);
};


export const fetchProfileById = async (id: number): Promise<User | null> => {
  const response = await apiClient.get<{
    message: string;
    data: { users: User[] };
  }>(`/user/search?id=${id}`);
  return response.data.data.users.length > 0 ? response.data.data.users[0] : null;
};

export const fetchProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>("/user/profile");
  return response.data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/user/all");
  return response.data;
};

export const searchUsers = async (query: {
  name?: string;
  email?: string;
  country?: string;
}): Promise<User[]> => {
  const response = await apiClient.get<{
    message: string;
    data: { users: User[] };
  }>("/user/search", {
    params: query,
  });
  return response.data.data.users.length > 0 ? response.data.data.users : [];
};

export const updateProfile = async (user: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>('/user/updateByUser', user);
  return response.data;
};

export const updateProfileByAdmin = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>(`/user/update?id=${id}`, user);
  return response.data;
};


export const signup = async (userData: {
  name: string;
  rut: string;
  email: string;
  phone: string;
  country: string;
  birthday: Date;
  role: string;
  password: string;
}): Promise<User> => {
  const response = await apiClient.post("/user/signup", userData);
  return response.data;
};
export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await apiClient.post('/user/change-password', {
      currentPassword,
      newPassword,
    });

    // Access status code and message from the response
    const { status, data } = response;
    console.log(status, data);
    if (status === 401) {
      // Handle unauthorized response
      console.error(data.message || 'Unauthorized');
    } else if (status === 200) {
      // Handle success response
      console.log(data.message || 'Password updated successfully');
    }

    return data;
  } catch (error) {
    // Handle errors from the API call
    console.error('An error occurred:', error);
    throw error;  // Re-throw the error to be handled by the caller
  }
};