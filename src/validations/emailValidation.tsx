import { fetchAllUsers } from '../api/userServices'; // Adjust the import path as needed

export const isEmailValidAndAvailable = async (email: string): Promise<{ valid: boolean, available: boolean }> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email format
  const valid = emailRegex.test(email);

  // Check if email exists in the user list
  let available = true;
  if (valid) {
    try {
      const users = await fetchAllUsers();
      const emailExists = users.some((user: { email: string }) => user.email === email);
      available = !emailExists;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return { valid, available };
};
