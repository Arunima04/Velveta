import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import ProductGrid from '../components/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="mb-8 mt-1 ">
      <div className="container mx-auto mx-w-2xl px-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}