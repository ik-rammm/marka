import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container py-5">
        <div className="row justify-content-between align-items-start">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="footer-brand">
              <h4 className="footer-brand-title">MARKA</h4>
              <p className="footer-description">
                La plateforme e-commerce dédiée aux marques locales marocaines. 
                Découvrez l'authenticité et l'élégance de nos créateurs locaux.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-lg-0">
            <h6 className="footer-title">Navigation</h6>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/produits">Produits</Link></li>
              <li><Link to="/categories">Catégories</Link></li>
              <li><Link to="/panier">Panier</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="col-lg-2 col-md-3 col-sm-6 mb-4 mb-lg-0">
            <h6 className="footer-title">Compte</h6>
            <ul className="footer-links">
              <li><Link to="/connexion">Connexion</Link></li>
              <li><Link to="/inscription">Inscription</Link></li>
              <li><Link to="/espace-client">Mon Compte</Link></li>
              <li><Link to="/commandes">Mes Commandes</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6 col-sm-12">
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li><a href="#contact">Contact</a></li>
              <li><a href="#aide">Aide</a></li>
              <li><a href="#conditions">Conditions</a></li>
              <li><a href="#confidentialite">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="footer-copyright">
                © 2025 MARKA. Tous droits réservés.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="footer-made-with">
                Fait avec ❤️ pour soutenir l'artisanat marocain
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;