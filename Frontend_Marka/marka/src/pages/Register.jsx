import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Register() {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    address: '',
    phone: '',
    roles: ['USER'],
  });
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDataResponse = await registerUser(userData);
      navigate(userDataResponse.roles.includes('VENDOR') ? '/espace-vendeur' : '/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoleChange = (role) => {
    if (role === 'VENDOR') {
      setUserData({ ...userData, roles: ['USER', 'VENDOR'] });
    } else {
      setUserData({ ...userData, roles: ['USER'] });
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-8 col-lg-6">
            <motion.div
              className="register-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Inscription
              </motion.h1>
              
              {error && (
                <motion.div 
                  className="alert alert-danger text-center mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error.includes('Connexion au serveur impossible')
                    ? 'Le serveur n\'est pas disponible. Veuillez vérifier que le backend est en cours d\'exécution.'
                    : error}
                </motion.div>
              )}
              
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                        placeholder="Votre email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="firstName" className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="lastName" className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="password" className="form-label">Mot de passe</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                        placeholder="Votre mot de passe"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="address" className="form-label">Adresse</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        placeholder="Votre adresse"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="phone" className="form-label">Téléphone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        placeholder="Votre téléphone"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group mb-4">
                  <label className="form-label">Type de compte</label>
                  <div className="d-flex gap-4 justify-content-center">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="client"
                        name="role"
                        value="USER"
                        checked={userData.roles.length === 1 && userData.roles.includes('USER')}
                        onChange={() => handleRoleChange('USER')}
                        className="form-check-input"
                      />
                      <label htmlFor="client" className="form-check-label">Client</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="vendor"
                        name="role"
                        value="VENDOR"
                        checked={userData.roles.includes('VENDOR')}
                        onChange={() => handleRoleChange('VENDOR')}
                        className="form-check-input"
                      />
                      <label htmlFor="vendor" className="form-check-label">Vendeur</label>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  className="btn btn-primary w-100"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  S'inscrire
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register; 