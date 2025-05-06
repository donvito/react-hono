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

// Todo API endpoint
api.get('/todos', (c) => {
  const todos = [
    { id: 1, title: 'Learn Hono', completed: true },
    { id: 2, title: 'Build an API with Hono', completed: false },
    { id: 3, title: 'Deploy with Nixpacks', completed: false },
    { id: 4, title: 'Deploy with Nixpacks', completed: false }
  ];
  return c.json(todos);
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