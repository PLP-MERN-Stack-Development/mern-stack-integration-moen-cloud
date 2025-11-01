import { useTheme } from '../context/ThemeContext';

const PostCard = ({ post }) => {
  const { darkMode } = useTheme();
  
  return (
    <article className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}>
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow-lg">
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className={`flex items-center text-sm mb-3 space-x-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
            {post.author}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            {post.readTime || '5 min read'}
          </span>
        </div>
        
        <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors line-clamp-2`}>
          {post.title}
        </h2>
        
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-3 mb-4`}>
          {post.content}
        </p>
        
        <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group/btn">
          Read More
          <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default PostCard;