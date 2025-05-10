import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-3xl font-bold" 
              style={{ 
                fontFamily: 'cursive', 
                color: '#be185d'  // rose-700
              }}
            >
              Velveta
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/" 
              className="text-gray-700 font-medium hover:text-red-950 transition" 
               // gray-500
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 font-medium hover:text-red-950 transition" 

            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 font-medium hover:text-red-950 transition" 

            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
