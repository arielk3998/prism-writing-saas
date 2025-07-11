#!/bin/bash

# 🔄 Repository Sync Status Checker
# Comprehensive script to check repository synchronization status

echo "🔍 Checking Repository Sync Status..."
echo "======================================"

# Check if we're in a Git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "❌ Not in a Git repository!"
    exit 1
fi

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $BRANCH"

# Check working directory status
echo
echo "📁 Working Directory Status:"
if git diff --quiet && git diff --staged --quiet; then
    echo "✅ Working directory is clean"
else
    echo "⚠️  Working directory has uncommitted changes:"
    git status --porcelain
fi

# Check for unpushed commits
echo
echo "🔄 Sync Status:"
UNPUSHED=$(git log --oneline origin/$BRANCH..HEAD 2>/dev/null | wc -l)
if [ "$UNPUSHED" -eq 0 ]; then
    echo "✅ All commits are pushed to remote"
else
    echo "⚠️  $UNPUSHED unpushed commits:"
    git log --oneline origin/$BRANCH..HEAD
fi

# Check for unpulled commits
UNPULLED=$(git log --oneline HEAD..origin/$BRANCH 2>/dev/null | wc -l)
if [ "$UNPULLED" -eq 0 ]; then
    echo "✅ Local branch is up to date with remote"
else
    echo "⚠️  $UNPULLED unpulled commits available:"
    git log --oneline HEAD..origin/$BRANCH
fi

# Check remote connection
echo
echo "🌐 Remote Connection:"
if git ls-remote origin &>/dev/null; then
    echo "✅ Connected to remote repository"
    git remote -v
else
    echo "❌ Cannot connect to remote repository"
fi

# Check for large files
echo
echo "📊 Large Files Check:"
LARGE_FILES=$(find . -name "*.log" -o -name "*.cache" -o -name "*.pack" -o -name "*.idx" -o -name "node_modules" -o -name ".next" | head -5)
if [ -n "$LARGE_FILES" ]; then
    echo "⚠️  Large files/directories found:"
    echo "$LARGE_FILES"
else
    echo "✅ No problematic large files found"
fi

# Summary
echo
echo "📋 Summary:"
echo "==========="
if [ "$UNPUSHED" -eq 0 ] && [ "$UNPULLED" -eq 0 ] && git diff --quiet && git diff --staged --quiet; then
    echo "🎉 Repository is fully synchronized and clean!"
else
    echo "⚠️  Repository requires attention - see details above"
fi

echo
echo "🏁 Sync check complete!"
