
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';

// Inside your routes

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/adminwhololitsme" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;