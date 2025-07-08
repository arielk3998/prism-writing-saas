#!/bin/bash

echo "🌐 Setting up prismwriting.com domain..."
echo "======================================="

echo ""
echo "🔗 Opening Vercel Dashboard for domain configuration..."
echo "Go to Settings → Domains and add:"
echo "  - prismwriting.com"
echo "  - www.prismwriting.com"
echo ""

# Open Vercel dashboard
if command -v xdg-open &> /dev/null; then
    xdg-open "https://vercel.com/prism-writings-projects/prism-enterprise/settings/domains"
elif command -v open &> /dev/null; then
    open "https://vercel.com/prism-writings-projects/prism-enterprise/settings/domains"
else
    echo "Please manually open: https://vercel.com/prism-writings-projects/prism-enterprise/settings/domains"
fi

echo ""
echo "📋 DNS Records to configure with your domain provider:"
echo ""
echo "For ROOT domain (prismwriting.com):"
echo "  Type: A"
echo "  Name: @ (or blank/root)"
echo "  Value: 76.76.19.61"
echo "  TTL: 300"
echo ""
echo "For WWW subdomain (www.prismwriting.com):"
echo "  Type: CNAME" 
echo "  Name: www"
echo "  Value: cname.vercel-dns.com"
echo "  TTL: 300"
echo ""

echo "🔍 After configuring DNS, check propagation at:"
echo "https://dnschecker.org"
echo ""

echo "⚙️ Don't forget to update environment variables:"
echo "NEXT_PUBLIC_SITE_URL=https://prismwriting.com"
echo ""

echo "✅ Your site will be live at https://prismwriting.com within 5-30 minutes!"
