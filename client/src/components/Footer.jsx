import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                BlogSphere
              </span>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-md`}>
              Discover stories, thinking, and expertise from writers on any topic. Join our community of passionate writers and readers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:info@blogsphere.com" 
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors flex items-center`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@blogsphere.com
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@blogsphere.com" 
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-colors flex items-center`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  support@blogsphere.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            © {currentYear} BlogSphere. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} text-sm transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} text-sm transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} text-sm transition-colors`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;