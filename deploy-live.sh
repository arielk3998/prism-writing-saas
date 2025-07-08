#!/bin/bash

echo "🚀 Prism Writing SaaS - Live Deployment to prismwriting.com"
echo "========================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project found: Prism Writing SaaS"

# Clean any build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf uploads
git clean -fd

# Check git status
echo "📋 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Pre-deployment commit: Clean and ready for production"
fi

# Check if GitHub remote exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo ""
    echo "🔗 Setting up GitHub repository..."
    echo "Please follow these steps:"
    echo ""
    echo "1. Go to https://github.com and create a new repository named 'prism-writing-saas'"
    echo "2. Copy the repository URL"
    echo "3. Run: git remote add origin <repository-url>"
    echo "4. Run: git push -u origin main"
    echo ""
    echo "Example:"
    echo "  git remote add origin https://github.com/yourusername/prism-writing-saas.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    echo ""
    
    read -p "Press Enter when you've completed the above steps..."
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"

# Build the project to ensure it works
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🚀 Ready to deploy to Vercel..."
echo ""
echo "When prompted by Vercel CLI:"
echo "- Set up and deploy? → Y"
echo "- Which scope? → Your personal account or team"
echo "- Link to existing project? → N"
echo "- Project name? → prism-writing-saas"
echo "- In which directory is your code located? → ./"
echo "- Want to override settings? → N"
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Find your 'prism-writing-saas' project"
    echo "3. Go to Settings → Domains"
    echo "4. Add custom domain: prismwriting.com"
    echo "5. Add custom domain: www.prismwriting.com"
    echo "6. Configure DNS as instructed by Vercel"
    echo ""
    echo "🔐 Environment Variables to set in Vercel dashboard:"
    echo "   - JWT_SECRET=your-secret-here"
    echo "   - NEXT_PUBLIC_SITE_URL=https://prismwriting.com"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   - Vercel URL: Check Vercel dashboard"
    echo "   - Custom domain: https://prismwriting.com (after DNS setup)"
    echo ""
    echo "✨ Prism Writing SaaS is now LIVE! ✨"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
