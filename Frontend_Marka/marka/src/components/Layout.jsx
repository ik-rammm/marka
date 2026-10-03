import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function Layout({ children }) {
  useEffect(() => {
    const elements = document.querySelectorAll('.global-animate');
    elements.forEach((el, index) => {
      setTimeout(() => el.classList.add('visible'), index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="abstract-bg">
        <svg viewBox="0 0 1440 720" preserveAspectRatio="none">
          <path
            fill="url(#gradient)"
            d="M0,360L48,330C96,300,192,240,288,270C384,300,480,390,576,420C672,450,768,420,864,390C960,360,1056,330,1152,315C1248,300,1344,300,1392,315L1440,330V720H0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,360L48,330C96,300,192,240,288,270C384,300,480,390,576,420C672,450,768,420,864,390C960,360,1056,330,1152,315C1248,300,1344,300,1392,315L1440,330V720H0Z;
                M0,300L48,315C96,330,192,360,288,360C384,360,480,330,576,300C672,270,768,240,864,270C960,300,1056,360,1152,390C1248,420,1344,420,1392,390L1440,360V720H0Z;
                M0,360L48,330C96,300,192,240,288,270C384,300,480,390,576,420C672,450,768,420,864,390C960,360,1056,330,1152,315C1248,300,1344,300,1392,315L1440,330V720H0Z"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#B89B4C', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#3A1C26', stopOpacity: 0.15 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <motion.nav
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="navbar-brand global-animate">MARKA</NavLink>
          <ul className="flex space-x-6">
            {['Catégories', 'Ajouter Produit', 'Tableau de Bord'].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item === 'Catégories' ? '/categories' : item === 'Ajouter Produit' ? '/add-product' : '/tableau-de-bord-vendeur'}
                  className="nav-link global-animate"
                  activeClassName="active"
                >
                  {item}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto py-8"
      >
        {children}
      </motion.main>
      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <motion.p
            className="global-animate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © 2025 MARKA - Plateforme premium pour les marques locales.
          </motion.p>
          <div className="mt-4">
            {['À propos', 'Contact', 'Conditions'].map((item, index) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="footer-link mx-4 global-animate"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Layout;