import express from 'express';
const router = express.Router();
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

router
    .get('/getTodos', getTodos)
    .post('/addTodo', addTodo)
    .patch('/updateTodo/:id', updateTodo)
    .delete('/deleteTodo/:id', deleteTodo);

export default router;
