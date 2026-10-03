import api from './api';
import * as mockServices from './mocks/mockServices';

// Temporarily use mock services for testing
const USE_MOCKS = true;

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data; // List<OrderDto>
  } catch (error) {
    throw new Error('Impossible de charger les commandes : ' + (error.response?.data?.message || error.message));
  }
};

export const getOrderById = async (id) => {
  if (USE_MOCKS) {
    return mockServices.getOrderById(id);
  }
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data; // OrderDto
  } catch (error) {
    throw new Error('Impossible de charger la commande : ' + (error.response?.data?.message || error.message));
  }
};

export const getMyOrders = async (userId) => {
  if (USE_MOCKS) {
    return mockServices.getMyOrders(userId);
  }
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data; // List<OrderDto>
  } catch (error) {
    throw new Error('Impossible de charger les commandes : ' + (error.response?.data?.message || error.message));
  }
};

export const createOrderFromCart = async () => {
  try {
    const response = await api.post('/orders/from-cart');
    return response.data; // OrderDto
  } catch (error) {
    throw new Error('Impossible de créer la commande : ' + (error.response?.data?.message || error.message));
  }
};

export const createOrder = async (orderDto) => {
  if (USE_MOCKS) {
    // Simple mock order creation
    return { 
      ...orderDto, 
      id: Date.now(), 
      orderDate: new Date().toISOString(),
      status: 'En cours' 
    };
  }
  try {
    const response = await api.post('/orders', orderDto);
    return response.data; // OrderDto
  } catch (error) {
    throw new Error('Impossible de créer la commande : ' + (error.response?.data?.message || error.message));
  }
};

export const updateOrderStatus = async (id, status) => {
  if (USE_MOCKS) {
    // Mock status update
    return { id, status };
  }
  try {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data; // OrderDto
  } catch (error) {
    throw new Error('Impossible de mettre à jour le statut : ' + (error.response?.data?.message || error.message));
  }
};