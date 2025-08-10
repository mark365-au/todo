# Todo Application

A full-stack todo application built with React, Node.js, Express, PostgreSQL, and Docker.

## Features

- Add new todo items
- Edit existing todo items
- Delete todo items
- Mark todos as complete/incomplete
- Responsive web interface

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Deployment**: Ready for third-party hosting

## Project Structure

```
todo/
├── frontend/          # React application
├── backend/           # Node.js/Express API
├── database/          # PostgreSQL setup
├── docker-compose.yml # Multi-container setup
├── Dockerfile.frontend
├── Dockerfile.backend
└── README.md
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Git

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo
```

2. Start the application:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Local Development

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Database Setup
```bash
# Using Docker
docker run --name postgres-todo -e POSTGRES_PASSWORD=password -e POSTGRES_DB=todoapp -p 5432:5432 -d postgres:15
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/todoapp
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Deployment

This application is configured for deployment on third-party hosting platforms like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

See deployment guides in the `docs/` directory for platform-specific instructions.

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## License

This project is licensed under the MIT License.
