import express from 'express';
import { createUser, loginUser } from '../controllers/users.js';

export const userRouter = express.Router();

userRouter.post('/create', createUser);
userRouter.get('/login', loginUser);