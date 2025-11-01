import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

const Profile = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);

    // Fetch user's posts
    API.get('/posts')
      .then(res => {
        const myPosts = res.data.filter(post => post.author === userData.username);
        setUserPosts(myPosts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-8">
      {/* Profile Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user?.username}
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {user?.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userPosts.length}
                </span>
                <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Posts
                </span>
              </div>
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.role === 'admin' ? 'Admin' : 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'posts'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            My Posts
          </button>
        </div>

        {/* Posts Grid */}
        {userPosts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              You haven't written any posts yet.
            </p>
            <button
              onClick={() => navigate('/create-post')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Write Your First Post
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;