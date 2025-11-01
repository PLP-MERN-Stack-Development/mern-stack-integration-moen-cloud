import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'} border-b sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              BlogSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}
            >
              Home
            </Link>

            {token && (
              <>
                {user?.role === 'admin' && (
                  <>
                    <Link 
                      to="/create-post" 
                      className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}
                    >
                      Create Post
                    </Link>
                    <Link 
                      to="/categories" 
                      className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors`}
                    >
                      Categories
                    </Link>
                  </>
                )}
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <svg className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={`block w-full text-left px-4 py-2 text-sm text-red-500 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'} hover:scale-110 transition-transform`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {!token && (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} font-medium transition-colors`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 space-y-2 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <Link to="/" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
              Home
            </Link>
            {token && (
              <>
                <Link to="/profile" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                  My Profile
                </Link>
                {user?.role === 'admin' && (
                  <>
                    <Link to="/create-post" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                      Create Post
                    </Link>
                    <Link to="/categories" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                      Categories
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="block py-2 px-4 text-red-500 w-full text-left">
                  Logout
                </button>
              </>
            )}
            {!token && (
              <>
                <Link to="/login" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Login
                </Link>
                <Link to="/register" className={`block py-2 px-4 rounded ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;