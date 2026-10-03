// services/mocks/mockServices.js
const mockUser = {
  id: 1,
  email: 'test@marka.com',
  firstName: 'Jean',
  lastName: 'Dupont',
  roles: ['USER', 'VENDOR'],
  address: '123 Rue Fictive',
  phone: '+212 123 456 789',
};

let mockCategories = [
  { id: 1, name: 'Vêtements Traditionnels', description: 'Caftans, djellabas et tenues marocaines' },
  { id: 2, name: 'Maroquinerie', description: 'Sacs, pochettes et accessoires en cuir' },
  { id: 3, name: 'Décoration', description: 'Artisanat marocain pour la maison' },
  { id: 4, name: 'Bijoux', description: 'Bijoux berbères et contemporains' },
  { id: 5, name: 'Beauté', description: 'Produits cosmétiques naturels' },
  { id: 6, name: 'Gastronomie', description: 'Produits alimentaires artisanaux' },
];

let mockProducts = [
  {
    id: 1,
    name: 'Caftan Brodé Luxe',
    price: 2499.99,
    stock: 5,
    categoryId: 1,
    categoryName: 'Vêtements Traditionnels',
    description: 'Magnifique caftan marocain brodé à la main avec des fils d\'or. Parfait pour les grandes occasions.',
    images: { main: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400' },
    vendorId: 1,
  },
  {
    id: 2,
    name: 'Sac en Cuir de Marrakech',
    price: 899.99,
    stock: 12,
    categoryId: 2,
    categoryName: 'Maroquinerie',
    description: 'Sac artisanal en cuir véritable, tanné traditionnellement dans les tanneries de Marrakech.',
    images: { main: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' },
    vendorId: 1,
  },
  {
    id: 3,
    name: 'Tajine Décoratif en Céramique',
    price: 349.99,
    stock: 20,
    categoryId: 3,
    categoryName: 'Décoration',
    description: 'Tajine décoratif peint à la main avec des motifs berbères traditionnels.',
    images: { main: 'https://images.unsplash.com/photo-1572370508343-3018e22b5d0b?w=400' },
    vendorId: 2,
  },
  {
    id: 4,
    name: 'Collier Berbère en Argent',
    price: 1299.99,
    stock: 8,
    categoryId: 4,
    categoryName: 'Bijoux',
    description: 'Collier traditionnel berbère en argent massif avec pierres semi-précieuses.',
    images: { main: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
    vendorId: 2,
  },
  {
    id: 5,
    name: 'Huile d\'Argan Bio',
    price: 249.99,
    stock: 30,
    categoryId: 5,
    categoryName: 'Beauté',
    description: 'Huile d\'argan 100% pure et biologique, pressée à froid. Idéale pour la peau et les cheveux.',
    images: { main: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400' },
    vendorId: 3,
  },
  {
    id: 6,
    name: 'Miel de Thym Atlas',
    price: 179.99,
    stock: 25,
    categoryId: 6,
    categoryName: 'Gastronomie',
    description: 'Miel pur de thym récolté dans les montagnes de l\'Atlas. Propriétés médicinales reconnues.',
    images: { main: 'https://images.unsplash.com/photo-1587049352846-4a222e784390?w=400' },
    vendorId: 3,
  },
  {
    id: 7,
    name: 'Babouches en Cuir',
    price: 299.99,
    stock: 15,
    categoryId: 1,
    categoryName: 'Vêtements Traditionnels',
    description: 'Babouches traditionnelles en cuir souple, fabriquées à Fès. Disponibles en plusieurs couleurs.',
    images: { main: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400' },
    vendorId: 1,
  },
  {
    id: 8,
    name: 'Tapis Berbère Beni Ouarain',
    price: 3499.99,
    stock: 3,
    categoryId: 3,
    categoryName: 'Décoration',
    description: 'Authentique tapis berbère tissé à la main par les femmes de la tribu Beni Ouarain.',
    images: { main: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=400' },
    vendorId: 2,
  },
];

const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

export const loginUser = async (loginDto) => {
  await simulateDelay();
  if (loginDto.email === mockUser.email && loginDto.password === 'password123') {
    return mockUser;
  }
  throw new Error('Email ou mot de passe incorrect');
};

export const registerUser = async (userData) => {
  await simulateDelay();
  if (userData.email === mockUser.email) {
    throw new Error('Email déjà utilisé');
  }
  const newUser = { ...userData, id: Date.now() };
  localStorage.setItem('user', JSON.stringify(newUser));
  return newUser;
};

export const getCurrentUser = async () => {
  await simulateDelay();
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  throw new Error('Utilisateur non trouvé');
};

export const getCategories = async () => {
  await simulateDelay();
  return mockCategories;
};

export const createCategory = async (categoryDto) => {
  await simulateDelay();
  const newCategory = { ...categoryDto, id: mockCategories.length + 1 };
  mockCategories.push(newCategory);
  return newCategory;
};

export const getProducts = async () => {
  await simulateDelay();
  return mockProducts;
};

export const getProductById = async (id) => {
  await simulateDelay();
  const product = mockProducts.find((p) => p.id === Number(id));
  if (!product) throw new Error('Produit non trouvé');
  return product;
};

export const createProduct = async (productDto) => {
  await simulateDelay();
  if (!productDto.categoryId) throw new Error('Catégorie requise');
  const category = mockCategories.find((c) => c.id === Number(productDto.categoryId));
  if (!category) throw new Error('Catégorie non trouvée');
  const newProduct = {
    ...productDto,
    id: mockProducts.length + 1,
    categoryName: category.name,
    vendorId: JSON.parse(localStorage.getItem('user')).id,
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, productDto) => {
  await simulateDelay();
  const index = mockProducts.findIndex((p) => p.id === Number(id));
  if (index === -1) throw new Error('Produit non trouvé');
  const category = mockCategories.find((c) => c.id === Number(productDto.categoryId));
  if (!category) throw new Error('Catégorie non trouvée');
  mockProducts[index] = {
    ...productDto,
    id: Number(id),
    categoryName: category.name,
    vendorId: mockProducts[index].vendorId,
  };
  return mockProducts[index];
};

export const deleteProduct = async (id) => {
  await simulateDelay();
  const index = mockProducts.findIndex((p) => p.id === Number(id));
  if (index === -1) throw new Error('Produit non trouvé');
  mockProducts.splice(index, 1);
};

export const getCart = async (userId) => {
  await simulateDelay();
  const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {
    id: 1,
    userId,
    items: [],
  };
  return cart;
};

export const updateCartItem = async (userId, cartItemId, cartItemDto) => {
  await simulateDelay();
  const cart = await getCart(userId);
  const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);
  if (itemIndex === -1) throw new Error('Article non trouvé');
  cart.items[itemIndex] = { ...cart.items[itemIndex], ...cartItemDto };
  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  return cart;
};

export const removeFromCart = async (userId, cartItemId) => {
  await simulateDelay();
  const cart = await getCart(userId);
  cart.items = cart.items.filter((item) => item.id !== cartItemId);
  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
};

export const clearCart = async (userId) => {
  await simulateDelay();
  localStorage.setItem(`cart_${userId}`, JSON.stringify({ id: 1, userId, items: [] }));
};

export const getMyOrders = async (userId) => {
  await simulateDelay();
  return [
    {
      id: 1,
      userId,
      items: [{ id: 1, productId: 1, productName: 'Robe Élégante', quantity: 2, price: 199.99 }],
      totalAmount: 399.98,
      orderDate: new Date().toISOString(),
      status: 'Confirmée',
    },
  ];
};

export const getOrderById = async (id) => {
  await simulateDelay();
  const orders = await getMyOrders(JSON.parse(localStorage.getItem('user'))?.id);
  const order = orders.find((o) => o.id === Number(id));
  if (!order) throw new Error('Commande non trouvée');
  return order;
};  