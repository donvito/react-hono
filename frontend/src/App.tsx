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
        const response = await fetch('/api/todos');
        
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

  return (
    <div className="app">
      <h1>React + Hono Todo App</h1>
      
      {loading && <p>Loading todos...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && (
        <TodoList todos={todos} />
      )}
    </div>
  );
}

export default App; 