"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    return res.status(201).json({ message: "Added todos", todo: newTodo, todos: todos });
});
router.put('/todo/:id', (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const index = todos.findIndex(items => {
        return items.id === params.id;
    });
    if (index >= 0) {
        todos[index] = { id: params.id, text: body.text };
        return res.status(200).json({ message: "updated todos", todos: todos });
    }
    res.status(404).json({ message: "Could not found Id" });
});
router.delete('/todo/:id', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(item => item.id !== params.id);
    return res.status(200).json({ message: "Deleted todo", todos: todos });
});
exports.default = router;
