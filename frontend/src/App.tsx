import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Use API URL from environment variable in production, fallback to relative path for development
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/todos`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching todos. Is the backend running?');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const updateTodo = async (id: number, changes: Partial<Todo>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Error updating todo');
    }
  };

  return (
    <div className="app">
      <h1>React + Hono Todo App</h1>
      
      {loading && <p>Loading todos...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && (
        <TodoList todos={todos} onToggle={(id) => updateTodo(id, { completed: !todos.find(t => t.id === id)?.completed })} />
      )}
    </div>
  );
}

export default App; 