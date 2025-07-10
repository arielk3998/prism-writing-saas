#!/bin/bash

# Development setup script for Prism Enterprise
# Run this script to set up your development environment

set -e

echo "🚀 Setting up Prism Enterprise development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual environment variables"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Check if database is running
echo "🗄️  Setting up database..."
npm run db:migrate

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update your .env file with actual values"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 in your browser"
echo ""
echo "🛠️  Useful commands:"
echo "- npm run dev        # Start development server"
echo "- npm run build      # Build for production"
echo "- npm run validate   # Run type-check, lint, and format check"
echo "- npm run db:studio  # Open Prisma Studio"
echo "- npm run db:reset   # Reset database"
