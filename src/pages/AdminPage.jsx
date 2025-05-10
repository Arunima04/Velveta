import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import CategoryManagement from '../components/CategoryManagement';

const ADMIN_PASSWORD = "charup123";

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('manage-products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    affiliateLinks: [{ label: '', url: '' }]
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => doc.data().name);
      setCategories(categoriesData);
      
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      
      if (categoriesData.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: categoriesData[0] }));
      }
    };
    fetchData();
  }, [formData.category]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAffiliateLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.affiliateLinks];
    updatedLinks[index][field] = value;
    setFormData(prev => ({ ...prev, affiliateLinks: updatedLinks }));
  };

  const addAffiliateLink = () => {
    setFormData(prev => ({
      ...prev,
      affiliateLinks: [...prev.affiliateLinks, { label: '', url: '' }]
    }));
  };

  const removeAffiliateLink = (index) => {
    if (formData.affiliateLinks.length <= 1) return;
    const updatedLinks = [...formData.affiliateLinks];
    updatedLinks.splice(index, 1);
    setFormData(prev => ({ ...prev, affiliateLinks: updatedLinks }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      category: categories.length > 0 ? categories[0] : '',
      affiliateLinks: [{ label: '', url: '' }]
    });
    setIsEditing(false);
  };

  const handleEditProduct = (product) => {
    setFormData({
      id: product.id,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category,
      affiliateLinks: product.affiliateLinks.length > 0 
        ? product.affiliateLinks 
        : [{ label: '', url: '' }]
    });
    setIsEditing(true);
    setActiveTab('manage-products');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const linksToSubmit = formData.affiliateLinks.filter(
        link => link.label.trim() && link.url.trim()
      );

      const productData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        category: formData.category,
        affiliateLinks: linksToSubmit,
        updatedAt: serverTimestamp()
      };

      if (isEditing) {
        await updateDoc(doc(db, 'products', formData.id), productData);
      } else {
        productData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'products'), productData);
      }

      const productsSnapshot = await getDocs(collection(db, 'products'));
      const updatedProducts = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(updatedProducts);

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charup-lightpink">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-charup-darkpink mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-charup-darkpink bg-pink-600 text-white hover:bg-pink-700 py-2 rounded-lg transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-charup-darkpink mb-8 text-center">Admin Dashboard</h1>
        
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('manage-products')}
            className={`px-4 py-2 font-medium ${activeTab === 'manage-products' ? 'text-charup-darkpink border-b-2 border-charup-darkpink' : 'text-gray-600'}`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-medium ${activeTab === 'categories' ? 'text-charup-darkpink border-b-2 border-charup-darkpink' : 'text-gray-600'}`}
          >
            Manage Categories
          </button>
        </div>

        {activeTab === 'manage-products' && (
          <div className="space-y-8">
            {/* Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-charup-darkpink">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm text-gray-600 hover:text-charup-darkpink"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Product {isEditing ? 'updated' : 'added'} successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 mb-2">Product Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="imageUrl" className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-charup-darkpink">Affiliate Links</h3>
                    <button
                      type="button"
                      onClick={addAffiliateLink}
                      className="bg-charup-pink text-charup-darkpink px-3 py-1 rounded-lg text-sm hover:bg-charup-darkpink hover:text-pink-600 transition"
                    >
                      + Add Link
                    </button>
                  </div>
                  
                  {formData.affiliateLinks.map((link, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
                      <div>
                        <label htmlFor={`label-${index}`} className="block text-gray-700 mb-2">Label</label>
                        <input
                          type="text"
                          id={`label-${index}`}
                          value={link.label}
                          onChange={(e) => handleAffiliateLinkChange(index, 'label', e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                          required={index === 0}
                        />
                      </div>
                      <div>
                        <label htmlFor={`url-${index}`} className="block text-gray-700 mb-2">URL</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            id={`url-${index}`}
                            value={link.url}
                            onChange={(e) => handleAffiliateLinkChange(index, 'url', e.target.value)}
                            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
                            required={index === 0}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeAffiliateLink(index)}
                              className="bg-red-100 text-red-600 px-3 rounded-lg hover:bg-red-200 transition"
                              title="Remove this link"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-charup-darkpink bg-pink-600 text-white hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {submitting 
                    ? isEditing 
                      ? 'Updating...' 
                      : 'Adding...'
                    : isEditing 
                      ? 'Update Product' 
                      : 'Add Product'}
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-charup-darkpink mb-6">All Products</h2>
              {products.length === 0 ? (
                <p className="text-gray-600">No products found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img 
                              src={product.imageUrl} 
                              alt={product.title}
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-charup-darkpink hover:text-pink-600 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <CategoryManagement />
        )}
      </div>
    </div>
  );
}