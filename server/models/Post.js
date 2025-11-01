import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);