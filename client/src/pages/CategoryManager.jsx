import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Toast from '../components/Toast';

const CategoryManager = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      setMessage({ text: 'Failed to load categories', type: 'error' });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    setLoading(true);
    try {
      await API.post('/categories', { name: newCategory });
      setMessage({ text: 'Category created successfully', type: 'success' });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      setMessage({ text: err.response?.data?.error || 'Failed to create category', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) return;
    
    setLoading(true);
    try {
      await API.put(`/categories/${id}`, { name: editingName });
      setMessage({ text: 'Category updated successfully', type: 'success' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {setMessage({ text: err.response?.data?.error || 'Failed to update category', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    setLoading(true);
    try {
      await API.delete(`/categories/${id}`);
      setMessage({ text: 'Category deleted successfully', type: 'success' });
      fetchCategories();
    } catch (err) {
      setMessage({ text: err.response?.data?.error || 'Failed to delete category', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Category Manager
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Create and manage blog categories
          </p>
        </div>

        {message.text && (
          <Toast 
            message={message.text} 
            type={message.type} 
            onClose={() => setMessage({ text: '', type: '' })}
          />
        )}

        {/* Create Category Form */}
        <form onSubmit={handleCreate} className="mb-8">
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            New Category
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name..."
              className={`flex-1 px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'} border focus:ring-2 focus:ring-blue-500 transition-all`}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>

        {/* Categories List */}
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Existing Categories
          </h2>
          {categories.length === 0 ? (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No categories yet. Create your first one!
            </p>
          ) : (
            categories.map(category => (
              <div
                key={category._id}
                className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {editingId === category._id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white'} border-0 focus:ring-2 focus:ring-blue-500`}
                    />
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleUpdate(category._id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(category._id);
                          setEditingName(category.name);
                        }}
                        className="p-2 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        disabled={loading}
                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;