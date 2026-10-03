import api from './api';
import * as mockServices from './mocks/mockServices';

// Temporarily use mock services for testing
const USE_MOCKS = true;

export const login = async (loginDto) => {
  if (USE_MOCKS) {
    const user = await mockServices.loginUser(loginDto);
    return { 
      token: 'mock-jwt-token', 
      user 
    };
  }
  try {
    const response = await api.post('/auth/login', loginDto);
    const { token } = response.data;
    
    // Get user data separately since backend doesn't return it with login
    const userResponse = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { 
      token, 
      user: userResponse.data 
    };
  } catch (error) {
    throw new Error('Échec de la connexion : ' + (error.response?.data?.message || error.message));
  }
};

export const register = async (registerDto) => {
  if (USE_MOCKS) {
    const user = await mockServices.registerUser(registerDto);
    return { 
      token: 'mock-jwt-token', 
      user 
    };
  }
  try {
    const response = await api.post('/auth/register', registerDto);
    const { token } = response.data;
    
    // Get user data separately since backend doesn't return it with register
    const userResponse = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { 
      token, 
      user: userResponse.data 
    };
  } catch (error) {
    throw new Error('Échec de l\'inscription : ' + (error.response?.data?.message || error.message));
  }
};

export const getCurrentUser = async () => {
  if (USE_MOCKS) {
    return mockServices.getCurrentUser();
  }
  try {
    const response = await api.get('/users/me');
    return response.data; // UserDto
  } catch (error) {
    throw new Error('Impossible de récupérer l\'utilisateur : ' + (error.response?.data?.message || error.message));
  }
};