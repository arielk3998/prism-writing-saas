#!/bin/bash

echo "🚀 Starting Prism Writing SaaS Deployment Process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Ensure all dependencies are installed
echo "📦 Installing dependencies..."
npm ci

# Run build to ensure everything works
echo "🔨 Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

# Check if Vercel CLI is available
if ! command -v npx vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel 2>/dev/null || npm install vercel --save-dev
fi

# Commit any pending changes
echo "💾 Committing latest changes..."
git add .
git commit -m "🚀 Pre-deployment: Final updates and optimizations" || echo "No changes to commit"

# Set up Git remote if not exists
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No Git remote found. Please add your repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/prism-writing.git"
    echo "   git push -u origin master"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Push to remote repository
echo "📤 Pushing to remote repository..."
git push origin master

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo ""
echo "✅ Deployment process completed!"
echo ""
echo "🔧 Post-Deployment Setup Required:"
echo "1. Configure environment variables in Vercel dashboard:"
echo "   - SMTP_HOST, SMTP_USER, SMTP_PASSWORD"
echo "   - STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY"
echo "   - JWT_SECRET"
echo ""
echo "2. Set up custom domain (prismwriting.com) in Vercel"
echo "3. Configure email forwarding for hello@prismwriting.com"
echo "4. Test all features after deployment"
echo ""
echo "📖 See DEPLOYMENT_READY.md for detailed instructions"
