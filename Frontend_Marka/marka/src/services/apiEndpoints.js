// Centralise les endpoints API pour l'application
import api from './api';

// Auth
export const loginUserApi = (loginDto) => api.post('/auth/login', loginDto);
export const registerUserApi = (userDto) => api.post('/auth/register', userDto);
export const getCurrentUserApi = () => api.get('/auth/me');

// Categories
export const getCategoriesApi = () => api.get('/categories');
export const createCategoryApi = (categoryDto) => api.post('/categories', categoryDto);

// Products
export const getProductsApi = () => api.get('/products');
export const getProductByIdApi = (id) => api.get(`/products/${id}`);
export const createProductApi = (productDto) => api.post('/products', productDto);
export const updateProductApi = (id, productDto) => api.put(`/products/${id}`, productDto);
export const deleteProductApi = (id) => api.delete(`/products/${id}`);

// Cart
export const getCartApi = () => api.get('/cart');
export const addToCartApi = (productId, quantity) => api.post('/cart/add', { productId, quantity });
export const updateCartItemApi = (itemId, quantity) => api.put(`/cart/item/${itemId}`, { quantity });
export const removeFromCartApi = (itemId) => api.delete(`/cart/item/${itemId}`);

// Orders
export const getMyOrdersApi = () => api.get('/orders/my');
export const getOrderByIdApi = (orderId) => api.get(`/orders/${orderId}`);
export const createOrderFromCartApi = () => api.post('/orders/from-cart');
export const createOrderApi = (orderDto) => api.post('/orders', orderDto);

// Review
export const getProductReviewsApi = (productId) => api.get(`/reviews/product/${productId}`);
export const createReviewApi = (reviewDto) => api.post('/reviews', reviewDto);

// User
export const getUserByIdApi = (id) => api.get(`/users/${id}`);
