import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/cart';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Cart() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: () => getCart(user?.id),
    enabled: !!user?.id,
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, cartItemDto }) => updateCartItem(user?.id, cartItemId, cartItemDto),
    onSuccess: () => queryClient.invalidateQueries(['cart', user?.id]),
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemId) => removeFromCart(user?.id, cartItemId),
    onSuccess: () => queryClient.invalidateQueries(['cart', user?.id]),
  });

  const clearMutation = useMutation({
    mutationFn: () => clearCart(user?.id),
    onSuccess: () => queryClient.invalidateQueries(['cart', user?.id]),
  });

  // Check if user is logged in
  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-info text-center">
          Veuillez vous connecter pour voir votre panier.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 position-relative">
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Votre Panier
      </motion.h1>
      {error && (
        <div className="alert alert-danger text-center">{error.message}</div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : !cart || !cart.items || cart.items.length === 0 ? (
        <div className="alert alert-info">Votre panier est vide.</div>
      ) : (
        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-md-8">
            {cart.items.map((item, index) => (
              <motion.div
                key={item.id}
                className="card mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card-body d-flex align-items-center">
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #1E1E1E, #3A1C26)',
                      marginRight: '1rem',
                    }}
                  />
                  <div>
                    <h5 className="card-title">{item.productName}</h5>
                    <div className="form-group">
                      <label className="form-label">Quantité</label>
                      <input
                        type="number"
                        className="form-control w-auto"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateMutation.mutate({
                            cartItemId: item.id,
                            cartItemDto: { quantity: Number(e.target.value) },
                          })
                        }
                        placeholder="Quantité"
                      />
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <motion.button
                        className="btn btn-outline-danger"
                        onClick={() => removeMutation.mutate(item.id)}
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
            <motion.button
              className="btn btn-outline-danger mt-3"
              onClick={() => clearMutation.mutate()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vider le panier
            </motion.button>
          </div>
          <div className="col-md-4">
            <motion.div
              className="card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4>Récapitulatif</h4>
              <p>Total des articles : {cart.items.length}</p>
              <p>Total : {(cart.items.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0)).toFixed(2)} MAD</p>
              <motion.button
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Passer la commande
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Cart;