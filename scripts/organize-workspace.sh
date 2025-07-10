#!/bin/bash

# Workspace Organization Script for Prism Writing SaaS
# This script helps manage multiple repositories properly

echo "🔧 Prism Writing SaaS - Workspace Organization"
echo "=============================================="

# Check if we're in the correct directory
if [[ ! -f "package.json" ]] || [[ ! -d "src" ]]; then
    echo "❌ Error: Not in prism-enterprise directory"
    echo "Please run this script from the prism-enterprise root directory"
    exit 1
fi

echo "✅ Current directory: $(pwd)"
echo "✅ Repository: prism-enterprise"

# Check git status
echo ""
echo "📋 Git Status:"
git status --short
if [ $? -eq 0 ]; then
    echo "✅ Git repository is accessible"
else
    echo "❌ Git repository error"
    exit 1
fi

# Check if we're on the correct branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Not on main branch"
    read -p "Switch to main branch? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout main
        echo "✅ Switched to main branch"
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "📝 Uncommitted files:"
    git diff --name-only
    echo ""
    read -p "Commit these changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Enter commit message:"
        read -r COMMIT_MSG
        git add -A
        git commit -m "$COMMIT_MSG"
        echo "✅ Changes committed"
    fi
fi

# Check if we're ahead of origin
AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
if [ "$AHEAD" -gt 0 ]; then
    echo "⚠️  Warning: You are $AHEAD commits ahead of origin/main"
    read -p "Push to origin? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin main
        echo "✅ Pushed to origin"
    fi
fi

# Run project health checks
echo ""
echo "🏥 Project Health Check:"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ Node modules installed"
else
    echo "⚠️  Node modules missing"
    read -p "Install dependencies? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install
        echo "✅ Dependencies installed"
    fi
fi

# Check environment file
if [ -f ".env" ] || [ -f ".env.local" ]; then
    echo "✅ Environment file found"
else
    echo "⚠️  No environment file found"
    echo "📝 Consider creating .env.local for local development"
fi

# Test build
echo ""
echo "🔨 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    echo "🔍 Run 'npm run build' to see errors"
fi

# Test linting
echo ""
echo "🧹 Testing lint..."
if npm run lint > /dev/null 2>&1; then
    echo "✅ Lint passed"
else
    echo "⚠️  Lint warnings/errors found"
    echo "🔍 Run 'npm run lint' to see details"
fi

echo ""
echo "✨ Workspace organization complete!"
echo "📌 Focus on prism-enterprise repository for main development"
echo "🌐 Live site: https://prismwriting.com"
echo ""
echo "📋 Recommended next steps:"
echo "  1. Keep this repository as your primary focus"
echo "  2. Use 'git status' before making changes"
echo "  3. Commit and push changes regularly"
echo "  4. Test builds before deploying"
