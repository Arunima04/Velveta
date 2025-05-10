import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        name: newCategory.trim()
      });
      setCategories([...categories, { id: docRef.id, name: newCategory.trim() }]);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-charup-darkpink mb-4">Manage Categories</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-charup-darkpink"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-charup-darkpink px-4 py-2 rounded-lg bg-charup-darkpink bg-pink-600 text-white  hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-3">Existing Categories</h3>
        {loading && categories.length === 0 ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories yet</p>
        ) : (
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id} className="flex justify-between items-center bg-charup-lightpink p-3 rounded-lg">
                <span>{category.name}</span>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}