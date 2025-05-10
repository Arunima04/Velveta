import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such product!");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-12 text-gray-500">Product not found</div>;
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-auto max-h-[600px] object-contain rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-charup-darkpink mb-4">{product.title}</h1>
            <div className="mb-6">
              <span className="inline-block bg-charup-pink text-charup-darkpink px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
            
            <p className="text-gray-700 mb-8 whitespace-pre-line">{product.description}</p>
            
            <div className="space-y-4">
              {product.affiliateLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block  border border-charup-darkpink px-6 py-3 rounded-lg text-center font-medium bg-charup-darkpink bg-pink-600 text-white hover:bg-pink-700 transition"
                >
                  Buy {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
