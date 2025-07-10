# Development Guidelines

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- PostgreSQL database
- Git

### Initial Setup

1. Clone the repository
2. Run the setup script: `./scripts/setup-dev.sh`
3. Configure your environment variables in `.env`
4. Start development: `npm run dev`

## Development Workflow

### Code Quality

- **Type Safety**: All code must pass TypeScript checks (`npm run type-check`)
- **Linting**: Follow ESLint rules (`npm run lint`)
- **Formatting**: Use Prettier for consistent formatting (`npm run format`)
- **Testing**: Write tests for new features (`npm run test`)

### Pre-commit Hooks

Husky and lint-staged are configured to run quality checks before each commit:

- ESLint fixes and formatting
- Type checking
- Test validation

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run validate` - Run all quality checks
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run clean` - Clean build artifacts

## Database Management

### Prisma Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database (destructive)

### Migration Workflow

1. Make changes to `prisma/schema.prisma`
2. Run `npm run db:migrate` to create and apply migration
3. Commit both schema and migration files

## Testing

### Test Structure

- Unit tests: `*.test.ts` files alongside source code
- Integration tests: `tests/` directory
- API tests: `src/app/api/**/*.test.ts`

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test src/app/api/health/route.test.ts

# Run with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

### Mocking

- Database: Mock Prisma client
- Authentication: Mock Clerk functions
- External APIs: Use MSW (Mock Service Worker)

## Environment Variables

### Required Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

### Optional Variables

- `REDIS_URL` - Redis connection for caching
- `SMTP_*` - Email configuration
- `STRIPE_*` - Payment processing

## Code Style

### TypeScript

- Use strict mode
- Define proper interfaces and types
- Avoid `any` type
- Use type assertions carefully

### React Components

- Use function components with hooks
- Implement proper error boundaries
- Use Suspense for loading states
- Follow component composition patterns

### API Routes

- Use proper HTTP status codes
- Implement error handling
- Add request validation
- Include rate limiting

## Security

### Best Practices

- Validate all inputs
- Use parameterized queries
- Implement proper authentication
- Add CSRF protection
- Use HTTPS in production

### Dependencies

- Regularly update dependencies
- Run security audits (`npm audit`)
- Review new dependencies before adding

## Performance

### Optimization

- Use Next.js built-in optimizations
- Implement proper caching strategies
- Optimize database queries
- Use CDN for static assets

### Monitoring

- Health check endpoint: `/api/health`
- Error tracking with Sentry
- Performance monitoring
- Database query analysis

## Deployment

### Development

- Use Docker for consistent environment
- Run `docker-compose up` for local stack

### Production

- CI/CD pipeline with GitHub Actions
- Automatic deployments to Vercel
- Database migrations in production
- Environment-specific configurations

## Troubleshooting

### Common Issues

- **Build fails**: Check TypeScript errors with `npm run type-check`
- **Database connection**: Verify `DATABASE_URL` and database status
- **Authentication**: Check Clerk configuration and keys
- **Performance**: Use Next.js built-in analytics

### Getting Help

- Check the health endpoint: `GET /api/health`
- Review application logs
- Use database studio for data inspection
- Run the workspace organization script: `./scripts/organize-workspace.sh`
