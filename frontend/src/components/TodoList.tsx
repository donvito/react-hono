import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

const TodoList = ({ todos, onToggle }: TodoListProps) => {
  const [items, setItems] = useState<Todo[]>(todos);
  
  // Update local state when props change
  useEffect(() => {
    setItems(todos);
  }, [todos]);

  const toggleTodo = (id: number) => {
    // Update local state for immediate UI feedback
    setItems(
      items.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    
    // Call the parent handler to update the backend
    onToggle(id);
  };

  if (items.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <ul className="todo-list">
      {items.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span className="todo-title">{todo.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList; 