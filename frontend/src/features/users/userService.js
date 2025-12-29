import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Get all users (Admin only)
const getUsers = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `?page=${page}`, config);
  return response.data;
};

// Update user status (Admin only)
const updateUserStatus = async (userId, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${userId}/status`, { status }, config);
  return response.data;
};

const userService = {
  getUsers,
  updateUserStatus,
};

export default userService;