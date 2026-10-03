import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="navbar-content">
          <Link className="navbar-brand" to="/">MARKA</Link>
          
          <div className="navbar-menu">
            <ul className="navbar-nav">
              {['/', '/categories', '/produits', '/panier'].map((path, index) => (
                <motion.li
                  key={path}
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink className="nav-link" to={path}>
                    {path === '/' ? 'Accueil' : path === '/categories' ? 'Catégories' : path === '/produits' ? 'Produits' : 'Panier'}
                  </NavLink>
                </motion.li>
              ))}
              {user ? (
                <>
                  <motion.li
                    className="nav-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <NavLink className="nav-link" to="/espace-client">Espace Client</NavLink>
                  </motion.li>
                  {user.roles?.includes('VENDOR') && (
                    <>
                      <motion.li
                        className="nav-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <NavLink className="nav-link" to="/espace-vendeur">Espace Vendeur</NavLink>
                      </motion.li>
                      <motion.li
                        className="nav-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <NavLink className="nav-link" to="/tableau-de-bord-vendeur">Tableau de Bord</NavLink>
                      </motion.li>
                    </>
                  )}
                  <motion.li
                    className="nav-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <button className="btn btn-link nav-link" onClick={logout}>Déconnexion</button>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li
                    className="nav-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <NavLink className="nav-link" to="/connexion">Connexion</NavLink>
                  </motion.li>
                  <motion.li
                    className="nav-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <NavLink className="btn btn-primary" to="/inscription">Inscription</NavLink>
                  </motion.li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;