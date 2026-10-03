import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCategories } from '../services/category';
import { getProductById, updateProduct } from '../services/product';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    description: '',
    images: { main: '' },
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Set product data when product is loaded
  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categoryId: product.categoryId.toString(),
        images: product.images || { main: '' },
      });
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: () =>
      updateProduct(id, {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
        categoryId: Number(productData.categoryId),
        images: { main: productData.images.main },
      }),
    onSuccess: () => navigate('/tableau-de-bord-vendeur'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const fieldLabels = {
    name: 'Nom du produit',
    price: 'Prix (MAD)',
    stock: 'Stock disponible',
    categoryId: 'Catégorie',
    description: 'Description',
    images: 'URL de l\'image principale',
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.global-animate');
    elements.forEach((el, index) => {
      setTimeout(() => el.classList.add('visible'), index * 100);
    });
  }, []);

  return (
    <motion.div
      className="min-h-screen position-relative global-animate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container py-5">
        <motion.h1
          className="text-center mb-5 global-animate"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Modifier le Produit
        </motion.h1>
        {mutation.isError && (
          <motion.div
            className="alert alert-danger text-center global-animate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {mutation.error.message}
          </motion.div>
        )}
        {productLoading || categoriesLoading ? (
          <motion.div
            className="text-center global-animate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </motion.div>
        ) : (
          <motion.form
            className="card p-4 global-animate max-w-2xl mx-auto"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            {['name', 'price', 'stock', 'description'].map((field, index) => (
              <motion.div
                key={field}
                className="form-group mb-3 global-animate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <label className="form-label" htmlFor={field}>
                  {fieldLabels[field]}
                </label>
                {field === 'description' ? (
                  <textarea
                    className="form-control"
                    id={field}
                    rows="4"
                    value={productData[field]}
                    onChange={(e) => setProductData({ ...productData, [field]: e.target.value })}
                    placeholder={fieldLabels[field]}
                  />
                ) : (
                  <input
                    type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                    className="form-control"
                    id={field}
                    value={productData[field]}
                    onChange={(e) => setProductData({ ...productData, [field]: e.target.value })}
                    required={field !== 'description'}
                    placeholder={fieldLabels[field]}
                  />
                )}
              </motion.div>
            ))}
            <motion.div
              className="form-group mb-3 global-animate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="form-label" htmlFor="images">{fieldLabels.images}</label>
              <input
                type="text"
                className="form-control"
                id="images"
                value={productData.images.main}
                onChange={(e) => setProductData({ ...productData, images: { main: e.target.value } })}
                placeholder={fieldLabels.images}
              />
            </motion.div>
            <motion.div
              className="form-group mb-3 global-animate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="form-label" htmlFor="categoryId">{fieldLabels.categoryId}</label>
              <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
                <div
                  className="custom-select-toggle"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                >
                  {productData.categoryId
                    ? categories?.find((cat) => cat.id === Number(productData.categoryId))?.name || 'Choisissez une catégorie'
                    : 'Choisissez une catégorie'}
                </div>
                <div className="custom-select-menu">
                  <div
                    className="custom-select-item"
                    onClick={() => {
                      setProductData({ ...productData, categoryId: '' });
                      setIsSelectOpen(false);
                    }}
                  >
                    Choisissez une catégorie
                  </div>
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className="custom-select-item"
                      onClick={() => {
                        setProductData({ ...productData, categoryId: category.id });
                        setIsSelectOpen(false);
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(184, 155, 76, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {mutation.isPending ? 'Enregistrement...' : 'Modifier le produit'}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}

export default EditProduct;