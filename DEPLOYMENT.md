# Property Platform Deployment Guide

This guide provides comprehensive instructions for deploying the Property Sell and Buy Platform built with Next.js 15, TypeScript, and Prisma.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Building the Application](#building-the-application)
5. [Deployment Options](#deployment-options)
6. [Post-Deployment Steps](#post-deployment-steps)
7. [Maintenance and Monitoring](#maintenance-and-monitoring)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the application, ensure you have the following:

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Database access (SQLite for development, PostgreSQL/MySQL for production)
- Cloud hosting account (Vercel, Netlify, AWS, etc.)
- Domain name (optional)

## Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd property-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db" # For development
# For production: DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js (when implemented)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# File Upload (when implemented)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

## Database Setup

### Development (SQLite)

The application comes pre-configured with SQLite for development:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database with sample data
npx tsx prisma/seed.ts
```

### Production (PostgreSQL/MySQL)

1. **Set up your database:**
   - Create a database on your hosting provider
   - Get the connection string

2. **Update environment variables:**
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

3. **Run database migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Seed production data (optional):**
   ```bash
   npx tsx prisma/seed.ts
   ```

## Building the Application

### 1. Build the Application

```bash
npm run build
```

### 2. Run Linting and Type Checks

```bash
npm run lint
npm run type-check
```

### 3. Test the Build Locally

```bash
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Configure Domains:**
   - Add your custom domain in Vercel dashboard
   - Set up SSL certificates (automatic on Vercel)

### Option 2: Netlify

1. **Build Configuration:**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Environment Variables:**
   - Set up environment variables in Netlify dashboard
   - Ensure `NEXTAUTH_URL` is set to your Netlify URL

3. **Deploy:**
   - Connect your GitHub repository
   - Deploy automatically

### Option 3: AWS Amplify

1. **Initialize Amplify:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

2. **Add Hosting:**
   ```bash
   amplify add hosting
   amplify publish
   ```

3. **Environment Variables:**
   - Set up environment variables in AWS console
   - Configure build settings

### Option 4: Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine AS base
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t property-platform .
   docker run -p 3000:3000 --env-file .env.local property-platform
   ```

## Post-Deployment Steps

### 1. Health Check

Verify the deployment is working:

```bash
curl https://your-domain.com/api/health
```

### 2. Database Verification

Check database connectivity:

```bash
# Test database connection
npx tsx -e "
import { db } from './src/lib/db'
try {
  await db.$connect()
  console.log('Database connected successfully')
  await db.$disconnect()
} catch (error) {
  console.error('Database connection failed:', error)
}
"
```

### 3. SSL and Security

- Ensure HTTPS is enabled
- Set up security headers
- Configure CORS if needed
- Enable rate limiting

### 4. Monitoring Setup

- Set up application monitoring (Sentry, Datadog)
- Configure error tracking
- Set up performance monitoring
- Configure logging

## Maintenance and Monitoring

### 1. Database Maintenance

```bash
# Backup database (for PostgreSQL)
pg_dump your_database > backup.sql

# Optimize database
npx prisma db optimize

# View database stats
npx prisma db seed
```

### 2. Application Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Build and restart
npm run build
npm start
```

### 3. Performance Monitoring

- Monitor page load times
- Track database query performance
- Monitor API response times
- Set up alerts for errors

### 4. Security Updates

- Regularly update dependencies
```bash
npm audit
npm audit fix
```

- Monitor security vulnerabilities
- Keep Next.js and dependencies updated

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check database server status
   - Ensure proper permissions

3. **Environment Variables Not Loading**
   - Verify .env.local file exists
   - Check variable names and formatting
   - Restart the application

4. **Static File Issues**
   - Check public folder permissions
   - Verify file paths in components
   - Clear browser cache

### Debug Commands

```bash
# Check application logs
npm run logs

# Test API endpoints
curl https://your-domain.com/api/properties

# Database diagnostics
npx prisma db seed

# Type checking
npm run type-check

# Linting
npm run lint
```

### Performance Issues

1. **Slow Database Queries**
   - Add database indexes
   - Optimize Prisma queries
   - Use query caching

2. **Large Bundle Size**
   - Code split components
   - Optimize images
   - Use dynamic imports

3. **Memory Issues**
   - Monitor memory usage
   - Implement proper cleanup
   - Use serverless functions for heavy tasks

## Support

For additional support:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review Next.js [Documentation](https://nextjs.org/docs)
3. Consult Prisma [Documentation](https://www.prisma.io/docs)
4. Contact the development team

## Scaling Considerations

### When to Scale

- Database connection pooling
- Load balancing
- CDN for static assets
- Caching strategies

### Scaling Strategies

1. **Database Scaling**
   - Read replicas
   - Database sharding
   - Connection optimization

2. **Application Scaling**
   - Horizontal scaling
   - Microservices architecture
   - Serverless functions

3. **Infrastructure Scaling**
   - Auto-scaling groups
   - Content delivery networks
   - Global deployment

---

This deployment guide covers the essential steps for deploying your Property Platform. Depending on your specific requirements and hosting environment, you may need to adjust certain configurations.