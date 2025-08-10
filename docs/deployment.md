# Deployment Guide

This document provides instructions for deploying the Todo application to various hosting platforms.

## Prerequisites

- Docker and Docker Compose installed
- Application built and tested locally
- Environment variables configured

## Local Development

### Using Docker Compose (Recommended)

1. Start all services:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Manual Setup

1. Start PostgreSQL:
```bash
docker run --name postgres-todo \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=todoapp \
  -p 5432:5432 -d postgres:15
```

2. Start Backend:
```bash
cd backend
npm install
npm run dev
```

3. Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create Heroku apps:
```bash
# Create main app
heroku create your-todo-app

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
```

3. Deploy:
```bash
git push heroku main
```

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `DATABASE_URL`: Provided by Railway PostgreSQL
   - `NODE_ENV`: production
   - `PORT`: 5000 (backend)

3. Configure build commands:
   - Backend: `npm install && npm start`
   - Frontend: `npm install && npm run build`

### Render

1. Create a new Web Service for backend:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

2. Create a new Static Site for frontend:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

3. Add PostgreSQL database service

### DigitalOcean App Platform

1. Create a new app from GitHub repository
2. Configure components:
   - **Backend**: Node.js service
     - Source: `/backend`
     - Build: `npm ci`
     - Run: `npm start`
   
   - **Frontend**: Static site
     - Source: `/frontend`
     - Build: `npm ci && npm run build`
     - Output: `dist`
   
   - **Database**: PostgreSQL managed database

3. Set environment variables:
   - `DATABASE_URL`: Connection string from managed database
   - `NODE_ENV`: production

### Docker Deployment

For custom hosting with Docker:

1. Build images:
```bash
docker build -f Dockerfile.backend -t todo-backend .
docker build -f Dockerfile.frontend -t todo-frontend .
```

2. Push to registry:
```bash
docker tag todo-backend your-registry/todo-backend
docker tag todo-frontend your-registry/todo-frontend
docker push your-registry/todo-backend
docker push your-registry/todo-frontend
```

3. Deploy with docker-compose on your server

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@host:port/database
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

## Health Checks

The application includes health check endpoints:

- Backend: `GET /health`
- Frontend: Served by nginx with proper status codes

## SSL/HTTPS

For production deployments:

1. Use a reverse proxy (nginx, Cloudflare)
2. Configure SSL certificates (Let's Encrypt recommended)
3. Update CORS settings in backend for HTTPS

## Monitoring

Consider adding:

- Application monitoring (New Relic, DataDog)
- Error tracking (Sentry)
- Log aggregation (LogDNA, Papertrail)
- Uptime monitoring (Pingdom, UptimeRobot)

## Scaling

For high traffic:

1. Use a load balancer
2. Scale backend horizontally
3. Use a managed database service
4. Implement caching (Redis)
5. Use a CDN for static assets

## Troubleshooting

### Common Issues

1. **Database connection fails**:
   - Check DATABASE_URL format
   - Ensure database is accessible
   - Verify credentials

2. **CORS errors**:
   - Update backend CORS configuration
   - Check frontend API URL

3. **Build failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are listed

### Debug Commands

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Access database
docker-compose exec postgres psql -U postgres -d todoapp

# Test API
curl http://localhost:5000/health
```
