import apiClient from './apiClient';

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    alert('User created successfully!'); // Success alert
    return response.data;
  } catch (error) {
    console.error("User creation failed:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "An error occurred while creating the user. Please try again."
    ); // Error alert
    throw error; // Re-throw the error if further handling is needed
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    //alert('Login successful!');
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
    

    if (error.response) {
      alert(
        error.response.data.message || 
        "Login failed due to a server issue. Please try again later." 
      );
    } else {
      alert("Network error. Please check your connection and try again."); 
    }

    throw error; 
  }
};

export const updateUser = async (userId, userData, token) => {
  try {
    const response = await apiClient.patch(`/users/${userId}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    alert('Profile updated successfully!');
    return response.data;
  } catch (error) {
    console.error("Profile update failed:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "An error occurred while updating the profile. Please try again."
    );
    throw error;
  }
};