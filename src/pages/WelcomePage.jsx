import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(6));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedProducts(products);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="mb-8 " style={{
      backgroundImage: "url('/path-to-your-background-image.jpg')", // Replace with your image path
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
    }}>
      {/* Semi-transparent overlay for background */}
      <div style={{
        backgroundColor: "rgba(255, 247, 247, 0.85)",
        minHeight: "100vh"
      }}>
        <section className="text-center py-12 px-4" style={{
          backgroundImage: "url('/path-to-hero-image.jpg')", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}>
          {/* Overlay for hero section */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(253, 242, 248, 0.7)" // Soft pink overlay
          }}></div>
          
          {/* Content on top of overlay */}
          <div className="relative z-10">
            <h1 
              className="text-6xl md:text-5xl font-lora font-bold text-charup-darkpink mb-6" 
              style={{ 
                color: '#be185d' // rose-700 equivalent
              }}
            >
              Discover Beautiful Finds
            </h1>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
              Curated collection of products you'll love. Explore our handpicked selection.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-charup-darkpink text-white px-8 py-3 rounded-full font-lora font-medium hover:bg-pink-600 transition"
              style={{
                backgroundColor: '#e11d48', // rose-600 equivalent
                boxShadow: '0 4px 6px rgba(225, 29, 72, 0.25)'
              }}
            >
              Explore All Products
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 
            className="text-4xl font-lora font-bold text-center text-charup-darkpink mb-12"
            
            style={{ 
              color: '#be185d' // rose-700 equivalent
            }}
          >
            Hot Off the Press
          </h2>
          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} showFilters={false} />
          ) : (
            <p className="text-center text-gray-500">Loading featured products...</p>
          )}
        </section>
      </div>
    </div>
  );
} 