import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductById } from '../services/product';
import { addToCart } from '../services/cart';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function ProductDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  const mutation = useMutation({
    mutationFn: () => addToCart(user?.id, { productId: id, quantity: 1 }),
    onSuccess: () => queryClient.invalidateQueries(['cart', user?.id]),
  });

  return (
    <div className="container py-5 position-relative">
      <div className="abstract-bg">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="url(#gradient)"
            d="M0,144L48,154C96,165,192,187,288,176C384,165,480,133,576,122C672,112,768,122,864,144C960,165,1056,197,1152,197,C1248,197,1344,165,1392,149,C1440,133Z"
          >
            <animate
              attributeName="d"
              values="M0,144L48,154C96,165...;M0,133L48,144C96,154...;M0,144L48,154C96,165..."
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#B89B4C', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#3A1C26', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {error && (
        <div className="alert alert-danger text-center">{error.message}</div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : !product ? (
        <div className="alert alert-info">Produit non trouvé.</div>
      ) : (
        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-md-6">
            <div
              style={{
                maxHeight: '500px',
                height: '500px',
                background: 'linear-gradient(135deg, #1E1E1E, #3A1C26)',
              }}
            />
          </div>
          <div className="col-md-6">
            <motion.h1
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.name}
            </motion.h1>
            <p className="lead">{product.price.toFixed(2)} MAD</p>
            <p>{product.description}</p>
            <p>Stock : {product.stock}</p>
            <p>Catégorie : {product.categoryName}</p>
            {user && (
              <motion.button
                className="btn btn-primary"
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mutation.isPending ? 'Ajout...' : 'Ajouter au panier'}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ProductDetail;