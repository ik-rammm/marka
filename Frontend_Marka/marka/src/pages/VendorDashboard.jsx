import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { getProducts, deleteProduct } from '../services/product';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function VendorDashboard() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'vendor', user?.id],
    queryFn: async () => {
      const allProducts = await getProducts();
      return allProducts.filter((p) => p.vendorId === user.id);
    },
    enabled: !!user?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(['products', 'vendor', user?.id]),
  });

  return (
    <div className="container py-5">
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tableau de Bord Vendeur
      </motion.h1>
      <motion.div
        className="mb-4 d-flex gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/ajouter-produit" className="btn btn-primary">Ajouter un produit</Link>
        <Link to="/espace-vendeur" className="btn btn-primary">Gérer les catégories</Link>
      </motion.div>
      {error && (
        <div className="alert alert-danger text-center">
          {error.message.includes('Connexion au serveur impossible')
            ? 'Le serveur n\'est pas disponible. Veuillez vérifier que le backend est en cours d\'exécution.'
            : error.message}
        </div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : !products || products.length === 0 ? (
        <div className="alert alert-info">Aucun produit disponible.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card">
                <img
                  src={product.images?.main || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300'}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price.toFixed(2)} MAD</p>
                  <div className="d-flex gap-2">
                    <Link to={`/modifier-produit/${product.id}`} className="btn btn-primary btn-sm">
                      Modifier
                    </Link>
                    <motion.button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMutation.mutate(product.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Supprimer
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;