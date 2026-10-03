// pages/VendorCategorySetup.jsx
import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createCategory } from '../services/category';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function VendorCategorySetup() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: () => createCategory({ name: newCategoryName }),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries(['categories']);
      navigate(`/ajouter-produit?categoryId=${newCategory.id}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createNew) {
      if (!newCategoryName) {
        alert('Veuillez entrer un nom pour la nouvelle catégorie.');
        return;
      }
      mutation.mutate();
    } else {
      if (!categoryId) {
        alert('Veuillez sélectionner une catégorie.');
        return;
      }
      navigate(`/ajouter-produit?categoryId=${categoryId}`);
    }
  };

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
        Configuration de la Catégorie
      </motion.h1>
      {mutation.isError && (
        <div className="alert alert-danger text-center">{mutation.error.message}</div>
      )}
      <motion.form
        className="card p-4 mx-auto"
        style={{ maxWidth: '400px' }}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-group mb-3">
          <label className="form-label">Type d'action</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                type="radio"
                id="selectCategory"
                name="categoryAction"
                checked={!createNew}
                onChange={() => setCreateNew(false)}
                className="form-check-input"
              />
              <label htmlFor="selectCategory" className="form-check-label">Choisir une catégorie existante</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="createCategory"
                name="categoryAction"
                checked={createNew}
                onChange={() => setCreateNew(true)}
                className="form-check-input"
              />
              <label htmlFor="createCategory" className="form-check-label">Créer une nouvelle catégorie</label>
            </div>
          </div>
        </div>
        {!createNew ? (
          <motion.div
            className="form-group mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="form-label" htmlFor="categoryId">Catégorie</label>
            <div className={`custom-select ${isSelectOpen ? 'open' : ''}`}>
              <div
                className="custom-select-toggle"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                {categoryId
                  ? categories?.find((cat) => cat.id === Number(categoryId))?.name || 'Sélectionner une catégorie'
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
                        setCategoryId(category.id);
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
        ) : (
          <motion.div
            className="form-group mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="form-label" htmlFor="newCategoryName">Nom de la nouvelle catégorie</label>
            <input
              type="text"
              className="form-control"
              id="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
              placeholder="Nom de la catégorie"
            />
          </motion.div>
        )}
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isPending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mutation.isPending ? 'Enregistrement...' : 'Continuer'}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default VendorCategorySetup;