import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Categories() {
  // Mock data for testing
  const mockCategories = [
    { id: 1, name: 'Vêtements Traditionnels', description: 'Caftans, djellabas, et autres vêtements marocains authentiques' },
    { id: 2, name: 'Maroquinerie', description: 'Sacs, ceintures et accessoires en cuir artisanal' },
    { id: 3, name: 'Chaussures', description: 'Babouches, sandales et chaussures traditionnelles' },
    { id: 4, name: 'Décoration', description: 'Tapis, coussins et objets décoratifs berbères' },
    { id: 5, name: 'Bijoux', description: 'Bijoux berbères et artisanaux en argent' },
    { id: 6, name: 'Poterie', description: 'Céramiques et poteries de Fès et Salé' },
    { id: 7, name: 'Arts de la Table', description: 'Services à thé, plats et ustensiles traditionnels' },
    { id: 8, name: 'Cosmétiques', description: 'Produits de beauté naturels marocains' }
  ];

  const { data: categories = mockCategories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    initialData: mockCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="container py-5 position-relative">
      <div className="abstract-bg">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="url(#gradient)"
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224V320H0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224V320H0Z;
                M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64V320H0Z;
                M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224V320H0Z"
              dur="6s"
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
        Nos Collections
      </motion.h1>
      {error && (
        <div className="alert alert-danger text-center">{error.message}</div>
      )}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#B89B4C' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3" style={{ color: '#D3D3D3' }}>Chargement des collections...</p>
        </div>
      ) : !categories || !Array.isArray(categories) || categories.length === 0 ? (
        <motion.div 
          className="alert alert-info text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Aucune collection disponible pour le moment</h4>
          <p>Revenez bientôt pour découvrir nos nouvelles collections !</p>
        </motion.div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card text-center h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">{category.name}</h5>
                  {category.description && (
                    <p className="card-text text-muted small flex-grow-1">
                      {category.description}
                    </p>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto"
                  >
                    <Link to={`/produits?category=${category.id}`} className="btn btn-primary">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Explorer
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;