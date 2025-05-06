import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const [items, setItems] = useState<Todo[]>(todos);

  const toggleTodo = (id: number) => {
    setItems(
      items.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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