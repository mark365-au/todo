# Deploy Todo App to Render.com

This guide will help you deploy the Todo application to Render.com using Docker containers.

## Prerequisites

- GitHub repository with your todo app code
- Render.com account (free tier available)
- Docker images (will be built automatically by Render)

## Deployment Options

### Option 1: Using render.yaml (Recommended)

The `render.yaml` file in the root directory contains the complete infrastructure configuration.

#### Steps:

1. **Connect Repository to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository: `https://github.com/mark365-au/todo`
   - Render will automatically detect the `render.yaml` file

2. **Review Configuration**:
   ```yaml
   services:
     - type: web
       name: todo-backend
       env: docker
       dockerfilePath: ./Dockerfile.backend.render
     - type: web  
       name: todo-frontend
       env: docker
       dockerfilePath: ./Dockerfile.frontend.render
   databases:
     - name: todo-postgres
   ```

3. **Deploy**:
   - Click "Apply" to deploy all services
   - Render will automatically:
     - Create PostgreSQL database
     - Build and deploy backend service
     - Build and deploy frontend service
     - Configure environment variables

### Option 2: Manual Service Creation

#### 1. Create PostgreSQL Database

- Go to Render Dashboard
- Click "New" → "PostgreSQL"
- Name: `todo-postgres`
- Database Name: `todoapp`
- User: `postgres`
- Note down the connection string

#### 2. Deploy Backend Service

- Click "New" → "Web Service"
- Connect your GitHub repository
- Configuration:
  - **Name**: `todo-backend`
  - **Environment**: `Docker`
  - **Dockerfile Path**: `./Dockerfile.backend.render`
  - **Environment Variables**:
    - `NODE_ENV`: `production`
    - `PORT`: `5000`
    - `DATABASE_URL`: [PostgreSQL connection string from step 1]

#### 3. Deploy Frontend Service

- Click "New" → "Web Service"
- Connect your GitHub repository
- Configuration:
  - **Name**: `todo-frontend`
  - **Environment**: `Docker`
  - **Dockerfile Path**: `./Dockerfile.frontend.render`
  - **Environment Variables**:
    - `VITE_API_URL`: `https://todo-backend.onrender.com/api`

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Custom Domains (Optional)

1. Go to your service in Render Dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain name
4. Update DNS records as instructed

## SSL/HTTPS

Render automatically provides SSL certificates for all deployed services.

## Monitoring

- **Logs**: Available in Render Dashboard for each service
- **Metrics**: CPU, memory usage in service dashboard
- **Health Checks**: Configured via `/health` endpoint

## Scaling

- **Free Tier**: Limited to 750 hours/month, sleeps after 15 minutes of inactivity
- **Paid Plans**: 
  - Starter: $7/month per service
  - Standard: $25/month per service
  - Pro: $85/month per service

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Dockerfile syntax
   - Verify all dependencies are listed in package.json
   - Check build logs in Render Dashboard

2. **Database Connection Issues**:
   - Verify DATABASE_URL environment variable
   - Ensure SSL is enabled for production
   - Check database logs

3. **CORS Errors**:
   - Update backend CORS configuration
   - Verify frontend API URL

### Debug Commands

```bash
# Check service logs
# Go to Render Dashboard → Service → Logs

# Test API endpoint
curl https://your-backend-url.onrender.com/health

# Check database connection
# Use Render's built-in database shell
```

## Cost Estimation

### Free Tier
- **Database**: PostgreSQL (1GB storage, shared CPU)
- **Backend**: 750 hours/month
- **Frontend**: 750 hours/month
- **Total**: $0/month (with limitations)

### Paid Tier Example
- **Database**: $7/month (shared CPU, 1GB)
- **Backend**: $7/month (Starter plan)
- **Frontend**: $7/month (Starter plan)
- **Total**: $21/month

## Production Checklist

- [ ] Environment variables configured
- [ ] SSL enabled for database connections
- [ ] Health checks working
- [ ] Error monitoring set up
- [ ] Database backup strategy
- [ ] Custom domain configured (optional)
- [ ] CDN configured for frontend (optional)

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [GitHub Issues](https://github.com/mark365-au/todo/issues)
