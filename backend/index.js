const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://manikantamannalliker:himaansh01@cluster0.8cdpsbn.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});
const Todo = mongoose.model('Todo', todoSchema);


app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ msg: "Title and description are required" });
        }

        const newTodo = new Todo({
            title,
            description,
            completed: false
        });

        await newTodo.save();
        res.status(201).json({ msg: "Todo created" });
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json(deletedTodo);
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
