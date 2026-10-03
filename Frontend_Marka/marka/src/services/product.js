import api from './api';
import * as mockServices from './mocks/mockServices';

// Temporarily use mock services for testing
const USE_MOCKS = true;

export const getProducts = async () => {
  if (USE_MOCKS) {
    return mockServices.getProducts();
  }
  try {
    const response = await api.get('/products');
    return response.data; // List<ProductDto>
  } catch (error) {
    throw new Error('Impossible de charger les produits : ' + (error.response?.data?.message || error.message));
  }
};

export const getProductById = async (id) => {
  if (USE_MOCKS) {
    return mockServices.getProductById(id);
  }
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // ProductDto
  } catch (error) {
    throw new Error('Impossible de charger le produit : ' + (error.response?.data?.message || error.message));
  }
};

export const getProductsByCategory = async (categoryId) => {
  if (USE_MOCKS) {
    const products = await mockServices.getProducts();
    return products.filter(p => p.categoryId === Number(categoryId));
  }
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data; // List<ProductDto>
  } catch (error) {
    throw new Error('Impossible de charger les produits par catégorie : ' + (error.response?.data?.message || error.message));
  }
};

export const createProduct = async (productDto) => {
  if (USE_MOCKS) {
    return mockServices.createProduct(productDto);
  }
  try {
    const response = await api.post('/products', productDto);
    return response.data; // ProductDto
  } catch (error) {
    throw new Error('Impossible d\'ajouter le produit : ' + (error.response?.data?.message || error.message));
  }
};

export const updateProduct = async (id, productDto) => {
  if (USE_MOCKS) {
    return mockServices.updateProduct(id, productDto);
  }
  try {
    const response = await api.put(`/products/${id}`, productDto);
    return response.data; // ProductDto
  } catch (error) {
    throw new Error('Impossible de mettre à jour le produit : ' + (error.response?.data?.message || error.message));
  }
};

export const deleteProduct = async (id) => {
  if (USE_MOCKS) {
    return mockServices.deleteProduct(id);
  }
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw new Error('Impossible de supprimer le produit : ' + (error.response?.data?.message || error.message));
  }
};