import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import API from '../services/api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

// Sample posts for users who aren't logged in
const SAMPLE_POSTS = [
  {
    _id: 'sample-1',
    title: 'Getting Started with React and Tailwind CSS',
    content: 'Learn how to build modern web applications with React and Tailwind CSS. This comprehensive guide covers everything from setup to deployment, including best practices for component design, state management, and responsive layouts.',
    author: 'John Doe',
    category: { name: 'Web Development' },
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    createdAt: '2024-01-15',
    readTime: '5 min read'
  },
  {
    _id: 'sample-2',
    title: 'The Future of Artificial Intelligence',
    content: 'Exploring the latest trends and innovations in AI technology. From machine learning to neural networks, discover what\'s next in the world of artificial intelligence and how it will shape our future.',
    author: 'Jane Smith',
    category: { name: 'Technology' },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    createdAt: '2024-01-14',
    readTime: '8 min read'
  },
  {
    _id: 'sample-3',
    title: 'Mastering Modern JavaScript',
    content: 'Deep dive into ES6+ features and modern JavaScript development practices. Level up your coding skills with these essential tips and tricks that every developer should know.',
    author: 'Mike Johnson',
    category: { name: 'Programming' },
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    createdAt: '2024-01-13',
    readTime: '6 min read'
  },
  {
    _id: 'sample-4',
    title: 'Building Scalable Node.js Applications',
    content: 'Best practices for creating robust and scalable backend systems with Node.js and Express. Learn about microservices, API design, database optimization, and deployment strategies.',
    author: 'Sarah Williams',
    category: { name: 'Backend' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    createdAt: '2024-01-12',
    readTime: '10 min read'
  },
  {
    _id: 'sample-5',
    title: 'UI/UX Design Principles for Modern Apps',
    content: 'Create stunning user interfaces that users love. Explore the fundamental principles of design thinking, color theory, typography, and user experience optimization.',
    author: 'Emily Chen',
    category: { name: 'Design' },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    createdAt: '2024-01-11',
    readTime: '7 min read'
  },
  {
    _id: 'sample-6',
    title: 'Cybersecurity in the Digital Age',
    content: 'Protect your applications and data from modern threats. Learn about encryption, authentication, authorization, and the latest security practices for web applications.',
    author: 'David Martinez',
    category: { name: 'Security' },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    createdAt: '2024-01-10',
    readTime: '9 min read'
  }
];

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('/posts')
      .then(res => {
        if (res.data && res.data.length > 0) {
          const postsWithImages = res.data.map(post => ({
            ...post,
            image: post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
            readTime: post.readTime || '5 min read'
          }));
          setPosts(postsWithImages);
        } else {
          // Show sample posts if no real posts exist
          setPosts(SAMPLE_POSTS);
        }
      })
      .catch(() => {
        // Show sample posts on error
        setPosts(SAMPLE_POSTS);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           post.category?.name.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(posts.map(post => post.category?.name).filter(Boolean))];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">BlogSphere</span>
        </h1>
        <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search posts by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-6 py-4 rounded-xl ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-12`}
          />
          <svg className={`w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid or Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            {searchTerm || selectedCategory !== 'all' 
              ? 'No posts found matching your search.'
              : 'No posts found.'}
          </p>
          {!token && (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Create your first post!
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          
          {/* Results Info */}
          <div className="text-center mt-8">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {filteredPosts.length} of {posts.length} posts
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;