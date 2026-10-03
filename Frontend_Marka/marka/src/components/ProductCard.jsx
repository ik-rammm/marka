import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={product.images?.main || 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300'}
        className="card-img-top"
        alt={product.name}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title" style={{ fontSize: '1.2rem' }}>{product.name}</h5>
        <p className="card-text text-muted">{product.price.toFixed(2)} MAD</p>
        <Link to={`/produits/${product.id}`} className="btn btn-primary btn-sm">
          Voir Détails
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCard;