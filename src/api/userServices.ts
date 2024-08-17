import apiClient from './api';
import { User } from '../interfaces/User';


export const fetchProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/user/profile');
  return response.data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/user/all');
  return response.data;
};

export const searchUsers = async (query: { name?: string; email?: string; country?: string }): Promise<User[]> => {
  const response = await apiClient.get<{ message: string; data: { users: User[] } }>('/user/search', {
    params: query,
  });
  return response.data.data.users.length > 0 ? response.data.data.users : [];
};

