import { useEffect } from 'react';
import axios from 'axios';

export function Todos({ todos, setTodos }) {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todos/${id}`);
            
            const response = await axios.get("http://localhost:3000/todos");
            setTodos(response.data.todos);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div>
            <h2>To-Do List</h2>
            {todos.length > 0 ? (
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id}>
                            {todo.title} - {todo.description}
                            <button onClick={() => handleDelete(todo._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No todos available</p>
            )}
        </div>
    );
}
