import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function ProductGrid({ products, showFilters = true }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => doc.data().name);
        setCategories(['All', ...categoriesData]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (showFilters) {
      fetchCategories();
    }
  }, [showFilters]);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-charup-darkpink text-white'
                  : 'bg-charup-pink text-gray-700 hover:bg-charup-lightpink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
