import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Routes
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to the Hono API',
    status: 'OK',
  });
});

// API endpoints
const api = new Hono().basePath('/api');

// In-memory todos storage
let todos = [
  { id: 1, title: 'Learn Hono', completed: true },
  { id: 2, title: 'Build an API with Hono', completed: false },
  { id: 3, title: 'Deploy with Nixpacks', completed: false },
  { id: 4, title: 'Deploy with Nixpacks', completed: false }
];

// Todo API endpoints
api.get('/todos', (c) => {
  return c.json(todos);
});

api.put('/todos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...body
  };

  return c.json(todos[todoIndex]);
});

// Mount the API routes
app.route('', api);

// Start the server
const port = process.env.PORT || 80;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});