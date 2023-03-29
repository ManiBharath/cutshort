import express from 'express';
import { createTodo, deleteTodo, getTodos, markAsComplete, updateTodo } from '../controllers/todo.js';

export const todoRouter = express.Router();

todoRouter.post('/create', createTodo);
todoRouter.put('/update', updateTodo);
todoRouter.delete('/delete/:id', deleteTodo);
todoRouter.put('/complete', markAsComplete);
todoRouter.get('/', getTodos);