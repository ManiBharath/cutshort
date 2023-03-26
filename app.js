//Todo
// User can sign up and login using JWT token - /user , /login
// User can create multiple Todos and manage them (Delete, Edit, Mark as Complete) - /todo, /todo/:id
// User can create posts
// Posts will accept only text -  /post/:id, /posts
// Posts can have one or multiple comments
// User can query other users and view their details
// They can comment on other users’ posts
// They can ONLY view other users’ todos
// Add test cases using the library of your choice.


import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routes/users.js';

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter)

app.listen('8000', () => {
    console.log('connected')
})