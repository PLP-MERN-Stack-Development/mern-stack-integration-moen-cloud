import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const PostCard = ({ post, onLike, onComment }) => {
  const { darkMode } = useTheme();
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      if (onLike) onLike(post._id);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: JSON.parse(localStorage.getItem('user'))?.username || 'Anonymous',
      text: commentText,
      createdAt: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
    if (onComment) onComment(post._id, commentText);
  };
  
  return (
    <article className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group`}>
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

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <svg className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">{likes}</span>
            </button>

            {/* Comment Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400 hover:text-blue-500' : 'text-gray-600 hover:text-blue-500'} transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">{comments.length}</span>
            </button>
          </div>

          <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group/btn">
            Read More
            <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {/* Comment Form */}
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className={`flex-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'} border focus:ring-2 focus:ring-blue-500 text-sm`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {comments.length === 0 ? (
                <p className={`text-sm text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {comment.author}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;