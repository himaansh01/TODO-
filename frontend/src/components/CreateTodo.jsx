import { useState } from 'react';
import axios from 'axios';

export function CreateTodo({ setTodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            await axios.post("http://localhost:3000/todos", { title, description });
            const response = await axios.get("http://localhost:3000/todos");
            setTodos(response.data.todos);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <div>
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button
                style={{ padding: 10, margin: 10 }}
                onClick={handleAddTodo}
            >
                Add a Todo
            </button>
        </div>
    );
}
