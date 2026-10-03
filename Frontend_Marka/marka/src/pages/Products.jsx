import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductsByCategory } from '../services/product';
import { getCategories } from '../services/category';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

function Products() {
  const [categoryId, setCategoryId] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => (categoryId ? getProductsByCategory(categoryId) : getProducts()),
  });

  const handleCategorySelect = (id) => {
    setCategoryId(id ? Number(id) : null);
    setIsSelectOpen(false);
  };

  return (
    <div className="container py-5 position-relative">
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nos Collections
      </motion.h1>
      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
          <div
            className="custom-select-toggle"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            {categoryId
              ? categories?.find((cat) => cat.id === categoryId)?.name || 'Sélectionner une catégorie'
              : 'Toutes les Catégories'}
          </div>
          <div className="custom-select-menu">
            <div
              className="custom-select-item"
              onClick={() => handleCategorySelect(null)}
            >
              Toutes les Catégories
            </div>
            {categoriesLoading ? (
              <div className="custom-select-item">Chargement...</div>
            ) : (
              categories?.map((category) => (
                <div
                  key={category.id}
                  className="custom-select-item"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
      {error && (
        <div className="alert alert-danger text-center">{error.message}</div>
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
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;