import api from './api';
import * as mockServices from './mocks/mockServices';

// Temporarily use mock services for testing
const USE_MOCKS = true;

export const getCart = async (userId) => {
  if (USE_MOCKS) {
    return mockServices.getCart(userId);
  }
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data; // CartDto
  } catch (error) {
    throw new Error('Impossible de charger le panier : ' + (error.response?.data?.message || error.message));
  }
};

export const addToCart = async (userId, cartItemDto) => {
  if (USE_MOCKS) {
    const cart = await mockServices.getCart(userId);
    const newItem = { 
      ...cartItemDto, 
      id: Date.now(),
      productName: 'Produit Test',
      price: 99.99 
    };
    cart.items.push(newItem);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    return cart;
  }
  try {
    const response = await api.post(`/cart/${userId}/items`, cartItemDto);
    return response.data; // CartDto
  } catch (error) {
    throw new Error('Impossible d\'ajouter au panier : ' + (error.response?.data?.message || error.message));
  }
};

export const updateCartItem = async (userId, cartItemId, cartItemDto) => {
  if (USE_MOCKS) {
    return mockServices.updateCartItem(userId, cartItemId, cartItemDto);
  }
  try {
    const response = await api.put(`/cart/${userId}/items/${cartItemId}`, cartItemDto);
    return response.data; // CartDto
  } catch (error) {
    throw new Error('Impossible de mettre à jour l\'article : ' + (error.response?.data?.message || error.message));
  }
};

export const removeFromCart = async (userId, cartItemId) => {
  if (USE_MOCKS) {
    return mockServices.removeFromCart(userId, cartItemId);
  }
  try {
    await api.delete(`/cart/${userId}/items/${cartItemId}`);
  } catch (error) {
    throw new Error('Impossible de supprimer l\'article : ' + (error.response?.data?.message || error.message));
  }
};

export const clearCart = async (userId) => {
  if (USE_MOCKS) {
    return mockServices.clearCart(userId);
  }
  try {
    await api.delete(`/cart/${userId}`);
  } catch (error) {
    throw new Error('Impossible de vider le panier : ' + (error.response?.data?.message || error.message));
  }
};