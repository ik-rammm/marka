import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import VendorDashboard from './pages/VendorDashboard';
import ClientDashboard from './pages/ClientDashboard';
import VendorCategorySetup from './pages/VendorCategorySetup';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/produits/:id" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/commandes" element={<Orders />} />
            <Route path="/commandes/:id" element={<OrderDetail />} />
            <Route path="/ajouter-produit" element={<AddProduct />} />
            <Route path="/modifier-produit/:id" element={<EditProduct />} />
            <Route path="/tableau-de-bord-vendeur" element={<VendorDashboard />} />
            <Route path="/espace-client" element={<ClientDashboard />} />
            <Route path="/espace-vendeur" element={<VendorCategorySetup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;