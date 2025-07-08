#!/bin/bash

# 🚀 Prism Writing SaaS - Production Deployment Script
# This script helps deploy the Prism Writing platform to production

echo "🚀 Prism Writing SaaS - Production Deployment"
echo "============================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  Git remote not configured!"
    echo ""
    echo "Please set up your git repository first:"
    echo "1. Create a repository on GitHub, GitLab, or Bitbucket"
    echo "2. Add the remote: git remote add origin <your-repo-url>"
    echo "3. Push your code: git push -u origin main"
    echo ""
    echo "Example for GitHub:"
    echo "  git remote add origin https://github.com/yourusername/prism-writing-saas.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    echo ""
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Pre-deployment checks passed!"
echo ""

# Run final build test
echo "🔨 Running final build test..."
npm run build --silent

if [ $? -eq 0 ]; then
    echo "✅ Build test passed!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "Choose deployment method:"
echo "1. Deploy via Vercel CLI (recommended)"
echo "2. Manual deployment via Vercel dashboard"
echo ""

read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying via Vercel CLI..."
        echo ""
        echo "When prompted:"
        echo "- Link to existing project? → No"
        echo "- Project name? → prism-writing-saas"
        echo "- Directory? → ./"
        echo "- Override settings? → No"
        echo ""
        
        vercel --prod
        
        echo ""
        echo "✅ Deployment initiated!"
        echo ""
        echo "📝 Next steps:"
        echo "1. Configure environment variables in Vercel dashboard"
        echo "2. Set up custom domain (prismwriting.com)"
        echo "3. Test all functionality"
        echo ""
        ;;
    2)
        echo ""
        echo "📋 Manual deployment steps:"
        echo "1. Go to https://vercel.com/dashboard"
        echo "2. Click 'New Project'"
        echo "3. Import your git repository"
        echo "4. Set project name to 'prism-writing-saas'"
        echo "5. Click 'Deploy'"
        echo ""
        echo "📝 Don't forget to:"
        echo "- Configure environment variables"
        echo "- Set up custom domain"
        echo "- Test all functionality"
        echo ""
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo "🎉 Deployment process completed!"
echo ""
echo "📚 For detailed instructions, see FINAL_DEPLOYMENT_GUIDE.md"
