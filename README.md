# 🚀 Prism Writing Enterprise Platform

A modern, transparent, and fully automated SaaS platform for professional writing services. Built with Next.js 15, TypeScript, and enterprise-grade technologies.

## ✨ Features

### 🎯 **Transparent Business Model**
- **Honest Statistics**: No inflated claims, only real data
- **Clear Pricing**: Transparent project pricing and timelines
- **Proven Portfolio**: Real client work with permission-based showcasing

### 🛠 **Enterprise Technology Stack**
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: API Routes with Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Validation**: Zod schemas

### 📊 **Admin Dashboard**
- **Lead Management**: Track and respond to client inquiries
- **Real-time Analytics**: Honest business metrics
- **Portfolio Management**: Showcase work samples
- **Email Integration**: Direct contact with prospects

### 🎨 **Modern Design**
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG compliant interface
- **Professional**: Clean, trustworthy aesthetic
- **Fast**: Optimized for performance

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prism-enterprise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   ```env
   DATABASE_URL="file:./dev.db"  # SQLite for development
   NEXT_PUBLIC_APP_URL="https://prismwriting.com"
   BUSINESS_EMAIL="your-email@domain.com"
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### 🏠 **Public Pages**
- **Homepage** (`/`): Professional landing page with transparent messaging
- **Portfolio** (`/portfolio`): Showcase of work samples and case studies  
- **Contact** (`/contact`): Functional contact form with lead capture

### 🔐 **Admin Dashboard** (`/admin`)
- **Dashboard Overview**: Real-time business metrics
- **Lead Management** (`/admin/leads`): View and manage client inquiries
- **Analytics**: Track website performance and conversion rates

### 📧 **Contact Form Integration**
The contact form automatically:
- Validates form data with Zod schemas
- Stores leads in the database
- Provides immediate feedback to users
- Enables admin follow-up workflow

## 🚀 **Deployment**

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Set up PostgreSQL database (recommended: Vercel Postgres)
   - Deploy!

## 📊 **Transparency & Analytics**

This platform is built with radical transparency:

- **Real Statistics**: All dashboard metrics reflect actual data
- **Honest Portfolio**: Only showcases actual client work
- **Clear Pricing**: No hidden fees or inflated claims
- **Open Communication**: Direct email integration for fast responses

## 🌐 **Live Platform**

**🎉 NOW LIVE AT: [https://prismwriting.com](https://prismwriting.com)**

The Prism Writing enterprise SaaS platform is fully deployed and operational!

## 📞 **Contact & Support**

- **Business Email**: hello@prismwriting.com
- **Portfolio**: View our work at `/portfolio`
- **Get Started**: Contact us at `/contact`

## 📋 Repository Management

### 🎯 **Primary Repository**
This is the **main production repository** for Prism Writing SaaS platform:
- **Live Site**: https://prismwriting.com
- **Branch**: `main` (primary development branch)
- **Focus**: All feature development and production deployments

### 🔧 **Workspace Organization**
To avoid confusion with multiple repositories:

1. **Use the provided workspace file**:
   ```bash
   code prism-enterprise.code-workspace
   ```

2. **Run workspace organization script**:
   ```bash
   ./scripts/organize-workspace.sh
   ```

3. **Focus on this repository** for all main development work

### 🚀 **Development Workflow**
1. Check status: `git status`
2. Create feature branch: `git checkout -b feature/name`
3. Make changes and commit: `git commit -m "description"`
4. Test: `npm run validate`
5. Push and deploy: `git push origin main`

### ⚠️ **Important Notes**
- Always work in this repository for production features
- Other repositories (prism-writing-website, etc.) are for experiments/archive
- Use the workspace organization script to maintain clean state
- Run `npm run validate` before pushing changes

---

**Built with ❤️ and transparency by Prism Writing**

*Last updated: January 2025*
