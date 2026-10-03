import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category';
import { createProduct } from '../services/product';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    description: '',
    images: { main: '' },
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createProduct({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        categoryId: Number(product.categoryId),
        images: { main: product.images.main },
      }),
    onSuccess: () => navigate('/tableau-de-bord-vendeur'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const fieldLabels = {
    name: 'Nom',
    price: 'Prix',
    stock: 'Stock',
    categoryId: 'Catégorie',
    description: 'Description',
    images: 'Image principale (URL)',
  };

  return (
    <div className="container py-5 position-relative">
      <motion.h1
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ajouter un Produit
      </motion.h1>
      {mutation.isError && (
        <div className="alert alert-danger text-center">{mutation.error.message}</div>
      )}
      <motion.form
        className="card p-4"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {['name', 'price', 'stock', 'description'].map((field, index) => (
          <motion.div
            key={field}
            className="form-group mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <label className="form-label" htmlFor={field}>
              {fieldLabels[field]}
            </label>
            {field === 'description' ? (
              <textarea
                className="form-control"
                id={field}
                rows="4"
                value={product[field]}
                onChange={(e) => setProduct({ ...product, [field]: e.target.value })}
              />
            ) : (
              <input
                type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                className="form-control"
                id={field}
                value={product[field]}
                onChange={(e) => setProduct({ ...product, [field]: e.target.value })}
                required={field !== 'description'}
              />
            )}
          </motion.div>
        ))}
        <motion.div
          className="form-group mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="form-label" htmlFor="images">Image principale (URL)</label>
          <input
            type="text"
            className="form-control"
            id="images"
            value={product.images.main}
            onChange={(e) => setProduct({ ...product, images: { main: e.target.value } })}
            placeholder="URL de l'image principale"
          />
        </motion.div>
        <motion.div
          className="form-group mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="form-label" htmlFor="categoryId">{fieldLabels.categoryId}</label>
          <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
            <div
              className="custom-select-toggle"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {product.categoryId
                ? categories?.find((cat) => cat.id === Number(product.categoryId))?.name || 'Sélectionner une catégorie'
                : 'Sélectionner une catégorie'}
            </div>
            <div className="custom-select-menu">
              {categoriesLoading ? (
                <div className="custom-select-item">Chargement...</div>
              ) : (
                categories?.map((category) => (
                  <div
                    key={category.id}
                    className="custom-select-item"
                    onClick={() => {
                      setProduct({ ...product, categoryId: category.id });
                      setIsSelectOpen(false);
                    }}
                  >
                    {category.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isPending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mutation.isPending ? 'Ajout...' : 'Ajouter le produit'}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default AddProduct;