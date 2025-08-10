# Manual Deployment Guide for Render.com (Free Tier)

## 🎯 **Step-by-Step Manual Deployment**

### **Step 1: ✅ PostgreSQL Database (COMPLETED)**
- Database created on Render.com
- External URL obtained

### **Step 2: Deploy Backend Service**

#### 2.1 Create Web Service
1. Go to https://dashboard.render.com
2. Click **"New" → "Web Service"**
3. Click **"Connect a repository"**
4. Select: `mark365-au/todo`

#### 2.2 Configure Backend Service
```
Name: todo-backend
Region: Singapore (same as database)
Branch: main
Runtime: Docker
Dockerfile Path: ./Dockerfile.backend.render
```

#### 2.3 Environment Variables
⚠️ **CRITICAL**: Add these environment variables in Render dashboard:

```
NODE_ENV = production
PORT = 5000
DATABASE_URL = postgresql://mark365au:HXiEyvB8fbxkVDhN9wk9mupCrE2Fzm90@dpg-d2butqqdbo4c73b7lgsg-a.singapore-postgres.render.com/todoapp_ulrw
```

#### 2.4 Advanced Settings
```
Health Check Path: /health
Auto-Deploy: Yes
```

### **Step 3: Deploy Frontend Service**

#### 3.1 Create Second Web Service
1. Click **"New" → "Web Service"** again
2. Connect same repository: `mark365-au/todo`

#### 3.2 Configure Frontend Service
```
Name: todo-frontend
Region: Singapore
Branch: main
Runtime: Docker
Dockerfile Path: ./Dockerfile.frontend.render
```

#### 3.3 Environment Variables
⚠️ **Wait for backend URL first**, then add:
```
VITE_API_URL = https://[your-backend-service-url].onrender.com/api
```

### **Step 4: Update Frontend Configuration**

Once your backend deploys, you'll get a URL like:
`https://todo-backend-abc123.onrender.com`

Update the frontend environment variable:
```
VITE_API_URL = https://todo-backend-abc123.onrender.com/api
```

### **Step 5: Test Deployment**

1. **Backend Health Check**:
   ```
   https://your-backend-url.onrender.com/health
   ```

2. **Frontend Access**:
   ```
   https://your-frontend-url.onrender.com
   ```

3. **API Test**:
   ```
   https://your-backend-url.onrender.com/api/todos
   ```

## 🔒 **Security Notes**

- ✅ Database URL is configured as environment variable
- ✅ No sensitive data in git repository
- ✅ SSL enabled for production database connections
- ✅ Environment variables managed in Render dashboard

## 🆓 **Free Tier Limitations**

- Services sleep after 15 minutes of inactivity
- 750 hours/month per service
- Database: 1GB storage, shared CPU
- Cold start time: ~30 seconds when waking up

## 🚀 **Deployment Status Checklist**

- [x] PostgreSQL database created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables configured
- [ ] Services tested and working

## 📞 **Next Steps**

1. Deploy the backend service with the configuration above
2. Note the backend URL when deployment completes
3. Deploy the frontend service
4. Update frontend VITE_API_URL with backend URL
5. Test the complete application

Let me know when you've completed the backend deployment!
