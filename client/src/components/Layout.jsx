import { useTheme } from '../context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;