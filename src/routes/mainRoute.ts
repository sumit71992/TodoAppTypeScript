import { Router } from "express";
import { Todo } from '../models/todo';

const router = Router();
let todos: Todo[] = [];
type reqBody = {
    text: string;
}
type reqParams = { id: string };
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as reqBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    return res.status(201).json({ message: "Added todos", todo: newTodo, todos: todos });
});

router.put('/todo/:id', (req, res, next) => {
    const params = req.params as reqParams;
    const body = req.body as reqBody;
    const index = todos.findIndex(items => {
        return items.id === params.id;
    });
    if (index >= 0) {
        todos[index] = { id: params.id, text: body.text };
        return res.status(200).json({ message: "updated todos", todos: todos });
    }
    res.status(404).json({ message: "Could not found Id" })
});

router.delete('/todo/:id', (req, res, next) => {
    const params = req.params as reqParams;
    todos = todos.filter(item => item.id !== params.id);
    return res.status(200).json({ message: "Deleted todo", todos: todos })
})
export default router;