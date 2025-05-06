# React and Hono Fullstack Application

This project consists of a React frontend and a Hono backend, both using TypeScript and configured for Nixpacks deployment.

## Project Structure

```
project/
├── frontend/         # React TypeScript frontend
└── backend/          # Hono TypeScript backend
```

## Prerequisites

- Node.js (v16+)
- Yarn or npm
- Nixpacks ([installation guide](https://nixpacks.com/docs/getting-started))

## Development Setup

### Backend (Hono)

```bash
cd backend
yarn install
yarn dev  # Runs on http://localhost:3001
```

### Frontend (React)

```bash
cd frontend
yarn install
yarn dev  # Runs on http://localhost:5173 with proxy to backend
```

## Building with Nixpacks

### Backend

```bash
cd backend
nixpacks build . -n backend-app
```

This will create a Docker image that you can run:

```bash
docker run -p 3001:3001 backend-app
```

### Frontend

```bash
cd frontend
nixpacks build . -n frontend-app
```

Run the frontend Docker image:

```bash
docker run -p 3000:3000 frontend-app
```

## Deployment

Both applications have a `nixpacks.toml` configuration file ready for deployment to platforms that support Nixpacks, like Render, Railway, or Fly.io.

## API Endpoints

- `GET /api/todos` - Get list of todos

## Features

- React frontend with TypeScript
- Hono backend API with TypeScript
- Configured for development and production
- Ready for deployment with Nixpacks 