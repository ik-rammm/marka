import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../services/order';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Orders() {
  const { user } = useContext(AuthContext);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: getMyOrders,
    enabled: !!user?.id,
  });

  return (
    <div className="container py-5 position-relative">
      <div className="abstract-bg">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="url(#gradient)"
            d="M0,144L48,154C96,165,192,187,288,176C384,165,480,133,576,122C672,112,768,122,864,144C960,165,1056,197,1152,197C1248,197,1344,165,1392,149L1440,133Z"
          >
            <animate
              attributeName="d"
              values="M0,144L48,154C96,165...;M0,133L48,144C96,154...;M0,144L48,154..."
              dur="10s"
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
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Vos Commandes
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
      ) : !orders || orders.length === 0 ? (
        <div className="alert alert-info">Aucune commande trouvée.</div>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              className="col-md-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Commande #{order.id}</h5>
                  <p className="card-text">Date : {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p className="card-text">Total : {order.totalAmount.toFixed(2)} MAD</p>
                  <p className="card-text">Statut : <span className="badge bg-success">{order.status}</span></p>
                  <motion.a
                    href={`/commandes/${order.id}`}
                    className="btn btn-primary btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Détails
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;