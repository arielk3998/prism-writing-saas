# Production Environment Configuration

## Database Setup Commands

# 1. Create Vercel Postgres Database
vercel postgres create prism-enterprise-db

# 2. Add Database URL to Vercel Environment
vercel env add DATABASE_URL production

# 3. Push Production Schema
npx prisma db push --schema=./prisma/schema.production.prisma

# 4. Generate Prisma Client for Production
npx prisma generate --schema=./prisma/schema.production.prisma

# 5. Seed Production Database
npm run db:seed:production

## Environment Variables to Add to Vercel

DATABASE_URL="postgresql://..." (from Vercel Postgres)
NEXT_PUBLIC_APP_URL="https://prismwriting.com"
BUSINESS_EMAIL="hello@prismwriting.com"
NODE_ENV="production"

## SMTP Configuration (Next Phase)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="hello@prismwriting.com"
SMTP_PASSWORD="app-specific-password"
FROM_EMAIL="hello@prismwriting.com"
