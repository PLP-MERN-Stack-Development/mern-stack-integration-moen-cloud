import { useTheme } from '../context/ThemeContext';

const CategorySelect = ({ categories, value, onChange }) => {
  const { darkMode } = useTheme();
  
  return (
    <select
      name="category"
      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Select a category</option>
      {categories.map(cat => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </select>
  );
};

export default CategorySelect;