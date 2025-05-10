export default function Footer() {
  return (
    <footer className="bg-pink-50 py-10 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Description */}
          <div>
            <h3 
              className="text-2xl font-bold mb-4" 
              style={{ fontFamily: 'cursive', color: '#be185d' }}  // rose-700
            >
              Velveta
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Discover beautiful products curated just for you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-xl font-semibold mb-4" 
              style={{ color: '#be185d' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-700 hover:text-pink-600 transition">Home</a></li>
              <li><a href="/products" className="text-gray-700 hover:text-pink-600 transition">Products</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-xl font-semibold mb-4" 
              style={{ color: '#be185d' }}
            >
              <a href="/contact" className="hover:text-pink-600 transition">Contact Us</a>
            </h4>
            <p className="text-gray-700">velveta.cares@gmail.com</p>
            <p className="text-gray-700 mt-2">
              <a 
                href="https://in.pinterest.com/arunimapandey2020/" 
                className="hover:text-pink-600 transition"
              >
                Follow us on Pinterest
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-pink-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Velveta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
