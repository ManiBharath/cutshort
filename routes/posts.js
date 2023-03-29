import express from 'express';
import { addComment, createPost } from '../controllers/posts.js';

export const postsRouter = express.Router();

postsRouter.post('/create', createPost);
postsRouter.post('/addComment', addComment);