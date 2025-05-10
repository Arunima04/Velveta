import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 w-full">
      <Link to={`/product/${product.id}`}>
        <div className="relative pb-[100%] overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="absolute h-full w-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </Link>
      <div className="px-2 py-3 text-center">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h3>
      </div>
    </div>
  );
}
