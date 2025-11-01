import express from 'express';
import Post from '../models/Post.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
router.post('/', authenticate, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    await post.populate('category');
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update post
router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like post
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    post.likes = (post.likes || 0) + 1;
    await post.save();
    
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment
router.post('/:id/comment', authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    const comment = {
      author: req.body.author,
      text: req.body.text,
      createdAt: new Date()
    };
    
    post.comments.push(comment);
    await post.save();
    
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get post comments
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;