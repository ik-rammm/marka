// pages/ClientDashboard.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { getMyOrders } from '../services/order';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ClientDashboard() {
  const { user } = useContext(AuthContext);

  // Mock user data for display if not available
  const displayUser = user || {
    firstName: 'Mohammed',
    lastName: 'Bennani',
    email: 'mohammed.bennani@example.com',
    address: '123 Avenue Mohammed V, Casablanca',
    phone: '+212 6 12 34 56 78'
  };

  // Mock data for testing
  const mockOrders = [
    {
      id: 1,
      orderDate: new Date('2024-01-15'),
      totalAmount: 1250.00,
      status: 'Livrée',
      items: [
        { productName: 'Caftan Marocain', quantity: 1, price: 800 },
        { productName: 'Babouches en cuir', quantity: 2, price: 225 }
      ]
    },
    {
      id: 2,
      orderDate: new Date('2024-01-20'),
      totalAmount: 450.00,
      status: 'En cours',
      items: [
        { productName: 'Sac en cuir traditionnel', quantity: 1, price: 450 }
      ]
    },
    {
      id: 3,
      orderDate: new Date('2024-01-25'),
      totalAmount: 2300.00,
      status: 'En préparation',
      items: [
        { productName: 'Tapis Berbère', quantity: 1, price: 1500 },
        { productName: 'Coussin brodé', quantity: 4, price: 200 }
      ]
    },
    {
      id: 4,
      orderDate: new Date('2024-02-01'),
      totalAmount: 650.00,
      status: 'Expédiée',
      items: [
        { productName: 'Théière en argent', quantity: 1, price: 650 }
      ]
    }
  ];

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['myOrders', user?.id],
    queryFn: () => getMyOrders(user?.id),
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
              values="
                M0,144L48,154C96,165...;M0,133L48,144C96,154...;M0,144L48,154C96,165..."
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
        Espace Client
      </motion.h1>
      {error && (
        <div className="alert alert-danger text-center">{error.message}</div>
      )}
      <motion.div
        className="card p-4 mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h4>Profil</h4>
        <p><i className="bi bi-person-fill me-2 text-primary"></i><strong>Nom :</strong> {displayUser.firstName} {displayUser.lastName}</p>
        <p><i className="bi bi-envelope-fill me-2 text-primary"></i><strong>Email :</strong> {displayUser.email}</p>
        <p><i className="bi bi-geo-alt-fill me-2 text-primary"></i><strong>Adresse :</strong> {displayUser.address || 'Non spécifiée'}</p>
        <p><i className="bi bi-telephone-fill me-2 text-primary"></i><strong>Téléphone :</strong> {displayUser.phone || 'Non spécifié'}</p>
      </motion.div>
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/panier" className="btn btn-primary">Voir le panier</Link>
      </motion.div>
      <motion.h2
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vos Commandes
      </motion.h2>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : !orders || !Array.isArray(orders) || orders.length === 0 ? (
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
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">Commande #{order.id}</h5>
                    <span className={`badge bg-${
                      order.status === 'Livrée' ? 'success' : 
                      order.status === 'Expédiée' ? 'info' : 
                      order.status === 'En cours' ? 'warning' : 
                      order.status === 'En préparation' ? 'secondary' : 'primary'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="card-text text-muted small mb-1">
                    <i className="bi bi-calendar3 me-1"></i>
                    {new Date(order.orderDate).toLocaleDateString('fr-FR', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="card-text mb-1">
                    <i className="bi bi-box-seam me-1"></i>
                    {order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}
                  </p>
                  <p className="card-text fw-bold text-primary mb-3">
                    <i className="bi bi-currency-exchange me-1"></i>
                    {order.totalAmount.toFixed(2)} MAD
                  </p>
                  <motion.a
                    href={`/commandes/${order.id}`}
                    className="btn btn-primary btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="bi bi-eye me-1"></i>
                    Voir détails
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

export default ClientDashboard;