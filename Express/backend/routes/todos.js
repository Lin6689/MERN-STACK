var express = require('express');
const { default: Todo } = require('../models/todo');
var router = express.Router();

/* GET all todos */
router.get('/', async function (req, res, next) {
    try {
        const todos = await Todo.find();
        res.status(200).json({ message: "data fatched successfully", data: todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in fetch data", err: error });
    }
});

/* CREATE todo */
router.post('/', async function (req, res, next) {
    try {
        const body = req.body;
        console.log(body);

        const todo = await Todo.create(body);
        res.status(200).json({ message: "data created successfully", data: todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in create todo", err: error });
    }
});

/* UPDATE todo */
router.put('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;

        const todo = await Todo.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json({
            message: "Todo updated successfully",
            data: todo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in update todo", err: error });
    }
});

/* DELETE todo */
router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        console.log(id);
        const todo = await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "data deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in delete todo", err: error });
    }
});

module.exports = router;