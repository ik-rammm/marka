import api from './api';
import * as mockServices from './mocks/mockServices';

// Temporarily use mock services for testing
const USE_MOCKS = true;

export const getCategories = async () => {
  if (USE_MOCKS) {
    return mockServices.getCategories();
  }
  try {
    const response = await api.get('/categories');
    return response.data; // List<CategoryDto>
  } catch (error) {
    throw new Error('Impossible de charger les catégories : ' + (error.response?.data?.message || error.message));
  }
};

export const createCategory = async (categoryDto) => {
  if (USE_MOCKS) {
    return mockServices.createCategory(categoryDto);
  }
  try {
    const response = await api.post('/categories', categoryDto);
    return response.data; // CategoryDto
  } catch (error) {
    throw new Error('Impossible d\'ajouter la catégorie : ' + (error.response?.data?.message || error.message));
  }
};

export const updateCategory = async (id, categoryDto) => {
  if (USE_MOCKS) {
    // Mock doesn't have update, use create logic
    return { ...categoryDto, id: Number(id) };
  }
  try {
    const response = await api.put(`/categories/${id}`, categoryDto);
    return response.data; // CategoryDto
  } catch (error) {
    throw new Error('Impossible de mettre à jour la catégorie : ' + (error.response?.data?.message || error.message));
  }
};

export const deleteCategory = async (id) => {
  if (USE_MOCKS) {
    // Mock doesn't have delete, just return
    return;
  }
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    throw new Error('Impossible de supprimer la catégorie : ' + (error.response?.data?.message || error.message));
  }
};