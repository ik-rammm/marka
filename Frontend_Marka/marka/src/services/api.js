import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api', // Utilise la variable d'environnement si dispo
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Timeout pour détecter les erreurs comme ERR_CONNECTION_REFUSED
});

// Ajouter le token JWT pour les requêtes protégées
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les erreurs réseau et HTTP
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error('Connexion au serveur impossible. Veuillez vérifier que le backend est en cours d\'exécution.');
    }
    if (error.response) {
      // Handle 403 Forbidden - likely an expired or invalid token
      if (error.response.status === 403) {
        // Clear the invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login if not already there
        if (window.location.pathname !== '/connexion') {
          window.location.href = '/connexion';
        }
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      }
      const message = error.response.data?.message || `Erreur serveur : ${error.response.status}`;
      throw new Error(message);
    }
    throw error;
  }
);

export default api;