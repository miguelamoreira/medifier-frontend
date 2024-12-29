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

export const updateAvatar = async (userId, file, token) => {
  const formData = new FormData();
  formData.append('avatar', {
    uri: file.uri, 
    type: file.type, 
    name: file.name,
  });

  try {
    const response = await apiClient.post(`/users/${userId}/avatar`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Avatar upload failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    alert('User deleted successfully!');
    return response.data;
  } catch (error) {
    console.error("Delete user failed:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "An error occurred while deleting the user. Please try again."
    );
    throw error;
  }
};

export const fetchAgenda = async (userId, token) => {
  try {
    const response = await apiClient.get(`/agenda`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.agendaItems;
  } catch (error) {
    console.error("Failed to fetch agenda:", error.response ? error.response.data : error.message);
    alert(
      error.response?.data?.message || "An error occurred while fetching the agenda. Please try again."
    );
    throw error;
  }
};

export const addAgendaItem = async (pillData, token) => {
  try {
    const response = await apiClient.post('/agenda', pillData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add agenda item:", error.response?.data || error.message);
    throw error;
  }
};