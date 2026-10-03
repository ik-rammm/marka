import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

function Home() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await getProducts();
      return response.slice(0, 4);
    },
  });

  return (
    <div className="position-relative">
      {/* Hero Section */}
      <motion.section
        className="text-center py-5"
        style={{ 
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)',
          position: 'relative'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Decorative background elements with original colors */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #B89B4C 0%, #3A1C26 100%)',
            borderRadius: '50%',
            opacity: 0.15,
            filter: 'blur(50px)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '180px',
            height: '180px',
            background: 'linear-gradient(135deg, #B89B4C 0%, #3A1C26 100%)',
            borderRadius: '50%',
            opacity: 0.12,
            filter: 'blur(70px)'
          }}
        />

        <motion.h1
          className="display-2 mb-4"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(135deg, #B89B4C 0%, #3A1C26 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MARKA
        </motion.h1>
        
        <motion.p
          className="lead mb-5"
          style={{ 
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            color: '#D3D3D3'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          L'élégance des marques locales marocaines, redéfinie pour l'ère moderne
        </motion.p>
        
        <motion.div
          className="d-flex gap-4 flex-column flex-md-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/produits" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Découvrir nos Produits
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/categories" 
              className="btn"
              style={{ 
                padding: '1rem 2rem', 
                fontSize: '1.1rem',
                border: '2px solid #B89B4C',
                color: '#B89B4C',
                background: 'transparent',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#B89B4C';
                e.target.style.color = '#0A0A0A';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#B89B4C';
              }}
            >
              Explorer les Catégories
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Products Section */}
      <section className="container py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3" style={{ color: '#B89B4C' }}>Produits en Vedette</h2>
          <p className="lead" style={{ color: '#D3D3D3', maxWidth: '600px', margin: '0 auto' }}>
            Découvrez notre sélection des meilleurs produits des marques locales marocaines
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="alert alert-danger text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error.message}
          </motion.div>
        )}

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#B89B4C' }}>
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3" style={{ color: '#D3D3D3' }}>Chargement des produits...</p>
          </div>
        ) : !products || products.length === 0 ? (
          <motion.div 
            className="alert alert-info text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4>Aucun produit disponible pour le moment</h4>
            <p>Revenez bientôt pour découvrir nos nouveaux produits !</p>
          </motion.div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {products && products.length > 0 && (
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/produits" className="btn btn-primary">
              Voir Tous les Produits
            </Link>
          </motion.div>
        )}
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(184, 155, 76, 0.08) 0%, rgba(58, 28, 38, 0.08) 100%)',
          borderTop: '1px solid rgba(184, 155, 76, 0.3)',
          borderBottom: '1px solid rgba(184, 155, 76, 0.3)'
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4" style={{ color: '#B89B4C' }}>Rejoignez Notre Communauté</h2>
            <p className="lead mb-4" style={{ 
              maxWidth: '700px', 
              margin: '0 auto 2rem auto',
              color: '#D3D3D3'
            }}>
              Créez votre style unique avec des créations locales d'exception. 
              Soutenez les artisans marocains et découvrez des produits authentiques.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-column flex-md-row align-items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/inscription" className="btn btn-primary" style={{ 
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  minWidth: '180px'
                }}>
                  Créer un Compte
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/categories" className="btn" style={{
                  border: '2px solid #B89B4C',
                  color: '#B89B4C',
                  background: 'transparent',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  minWidth: '180px',
                  display: 'inline-block',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  Explorer Maintenant
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;