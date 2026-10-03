import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../services/order';
import { motion } from 'framer-motion';

function OrderDetail() {
  const { id } = useParams();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
  });

  return (
    <div className="container py-5 position-relative">
      <div className="abstract-bg">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="url(#gradient)"
            d="M0,144L48,154C96,187,192,320,288,416C384,512,480,512,576,416C672,320,768,128,864,128C960,128,1056,320,1152,416C1248,512,1344,512,1392,416C1440,320,1440,128,1440,128V0H0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,144L48,154C96,187,192,320,288,416C384,512,480,512,576,416C672,320,768,128,864,128C960,128,1056,320,1152,416C1248,512,1344,512,1392,416C1440,320,1440,128,1440,128V0H0Z;
                M0,128L48,128C96,128,192,320,288,384C384,448,480,576,576,576C672,576,768,448,864,384C960,320,1056,320,1152,384C1248,448,1344,576,1392,576C1440,576,1440,448,1440,384V0H0Z;
                M0,144L48,154C96,187,192,320,288,416C384,512,480,512,576,416C672,320,768,128,864,128C960,128,1056,320,1152,416C1248,512,1344,512,1392,416C1440,320,1440,128,1440,128V0H0Z"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#B89B4C', stopOpacity: '0.2' }} />
              <stop offset="100%" style={{ stopColor: '#3A1C26', stopOpacity: '0.2' }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Détails de la Commande #{id}
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
      ) : !order ? (
        <div className="alert alert-info">Commande non trouvée.</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card mb-4">
            <div className="card-body">
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: {order.totalAmount.toFixed(2)} MAD</p>
              <p>Statut: <span className="badge bg-success">{order.status}</span></p>
            </div>
          </div>
          <h4>Articles</h4>
          <div className="row">
            {order.items.map((item, index) => (
              <motion.div
                key={item.id}
                className="col-md-6 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    <p>Quantité: {item.quantity}</p>
                    <p>Prix: {item.price.toFixed(2)} MAD</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default OrderDetail;