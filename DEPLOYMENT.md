# Deployment Guide for Prism Writing Enterprise Platform

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Domain name (optional, Vercel provides free subdomain)

### Step 1: GitHub Repository Setup

1. **Create a new GitHub repository**
   ```bash
   # If you haven't already, create a repository on GitHub
   # Then connect your local repo:
   git remote add origin https://github.com/YOUR_USERNAME/prism-enterprise.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `prism-enterprise` repository

2. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Environment Variables**
   Add these in Vercel dashboard under "Settings" → "Environment Variables":
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   BUSINESS_EMAIL=hello@prismwriting.com
   ```

### Step 3: Database Setup

**Option A: Vercel Postgres (Recommended)**
```bash
# In Vercel dashboard, go to Storage tab
# Create new Postgres database
# Copy the connection string to DATABASE_URL
```

**Option B: External PostgreSQL**
- Use Railway, PlanetScale, or Supabase
- Update `prisma/schema.prisma` to use PostgreSQL
- Run migrations: `npx prisma migrate deploy`

### Step 4: Domain Configuration

1. **Custom Domain (Optional)**
   - In Vercel project settings → Domains
   - Add your custom domain: `prismwriting.com`
   - Update DNS records as instructed

2. **SSL Certificate**
   - Automatically handled by Vercel
   - Force HTTPS in production

### Step 5: Post-Deployment Setup

1. **Database Migration**
   ```bash
   # After deployment, run in Vercel terminal or locally with production DB:
   npx prisma migrate deploy
   npx prisma generate
   ```

2. **Seed Production Data**
   ```bash
   # Optional: Add initial portfolio items and sample data
   npm run db:seed
   ```

3. **Test Everything**
   - Contact form submission
   - Admin dashboard access
   - Lead management functionality
   - Email notifications (if configured)

## 🔧 Alternative Deployment Options

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Deploy**
   ```bash
   docker build -t prism-enterprise .
   docker run -p 3000:3000 --env-file .env.production prism-enterprise
   ```

### Railway Deployment

1. **Connect GitHub repository**
2. **Add environment variables**
3. **Deploy automatically on push**

### Netlify Deployment

1. **Connect repository**
2. **Build command**: `npm run build`
3. **Publish directory**: `.next`
4. **Add environment variables**

## 🛡️ Production Checklist

### Security
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Input validation enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured

### Performance
- [ ] Images optimized
- [ ] Bundle size optimized
- [ ] Caching configured
- [ ] CDN setup (automatic with Vercel)

### Monitoring
- [ ] Error tracking (Sentry recommended)
- [ ] Analytics setup (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring

### Business
- [ ] Domain pointing to deployment
- [ ] Email forwarding setup
- [ ] Contact form testing
- [ ] Admin access verified
- [ ] Backup strategy in place

## 📊 Post-Launch

### Week 1: Monitoring
- Monitor contact form submissions
- Check for any errors or issues
- Verify email notifications work
- Test admin dashboard functionality

### Week 2: Optimization
- Analyze performance metrics
- Optimize based on real usage
- Add any missing features
- Improve based on feedback

### Ongoing: Maintenance
- Regular dependency updates
- Security patch monitoring
- Database backup verification
- Performance optimization

## 🆘 Common Issues & Solutions

### Build Failures
- Check environment variables
- Verify all dependencies installed
- Check TypeScript errors
- Verify Prisma schema

### Database Connection Issues
- Verify DATABASE_URL format
- Check database server status
- Verify network connectivity
- Check SSL requirements

### Contact Form Not Working
- Verify API routes deployed
- Check environment variables
- Test database connectivity
- Verify form validation

---

**Ready to go live with your professional writing business! 🚀**
