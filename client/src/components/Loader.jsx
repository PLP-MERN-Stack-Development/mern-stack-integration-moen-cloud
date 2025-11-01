import { useTheme } from '../context/ThemeContext';

const Loader = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-4 border-blue-300 opacity-20"></div>
      </div>
      <p className={`mt-4 text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Loading...
      </p>
    </div>
  );
};

export default Loader;