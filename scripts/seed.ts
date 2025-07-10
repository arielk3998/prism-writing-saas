import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah@techstartup.com',
        company: 'TechFlow Solutions',
        message: 'We need comprehensive API documentation for our new fintech platform. The project involves documenting REST APIs, SDK guides, and integration examples. Timeline is flexible but we\'d like to start soon.',
        source: 'CONTACT_FORM',
        status: 'NEW',
        priority: 'HIGH',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Michael Chen',
        email: 'm.chen@consulting.com',
        company: 'Strategic Consulting Group',
        message: 'Looking for help with a business proposal for a $2M government contract. Need someone experienced with formal proposal writing and compliance requirements.',
        source: 'REFERRAL',
        status: 'CONTACTED',
        priority: 'URGENT',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Emily Davis',
        email: 'emily@nonprofit.org',
        company: 'Community Impact Foundation',
        message: 'We need grant writing services for multiple foundation applications. Looking for someone with proven track record in non-profit grant writing.',
        source: 'CONTACT_FORM',
        status: 'QUALIFIED',
        priority: 'MEDIUM',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'David Rodriguez',
        email: 'david@healthtech.io',
        company: 'HealthTech Innovations',
        message: 'Need user guides and help documentation for our new medical device software. Must be compliant with FDA regulations.',
        source: 'SOCIAL_MEDIA',
        status: 'NEW',
        priority: 'MEDIUM',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Lisa Thompson',
        email: 'lisa@ecommerce.store',
        company: 'Premium Retail Co',
        message: 'Looking for website copy and product descriptions for our luxury e-commerce site. Need compelling copy that converts.',
        source: 'CONTACT_FORM',
        status: 'CONVERTED',
        priority: 'LOW',
      },
    })
  ])

  // Create sample analytics data
  const analytics = await Promise.all([
    prisma.analytics.create({
      data: {
        metric: 'website_visits',
        value: 1247,
        date: new Date('2025-01-01'),
      },
    }),
    prisma.analytics.create({
      data: {
        metric: 'contact_form_submissions',
        value: 23,
        date: new Date('2025-01-01'),
      },
    }),
    prisma.analytics.create({
      data: {
        metric: 'leads_converted',
        value: 5,
        date: new Date('2025-01-01'),
      },
    }),
  ])

  // Create sample newsletter subscribers
  const newsletter = await Promise.all([
    prisma.newsletter.create({
      data: {
        email: 'subscriber1@example.com',
        name: 'Alex Wilson',
        isActive: true,
      },
    }),
    prisma.newsletter.create({
      data: {
        email: 'subscriber2@example.com',
        name: 'Jordan Smith',
        isActive: true,
      },
    }),
    prisma.newsletter.create({
      data: {
        email: 'subscriber3@example.com',
        name: 'Casey Johnson',
        isActive: false,
      },
    }),
  ])

  // PHASE 6: Create sample users (admin and client)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@prismwriting.com',
        name: 'Admin User',
        role: 'ADMIN',
        status: 'ACTIVE',
        password: 'admin123', // This would be hashed in production
      },
    }),
    prisma.user.create({
      data: {
        email: 'client@example.com',
        name: 'Demo Client',
        role: 'CLIENT',
        status: 'ACTIVE',
        password: 'client123', // This would be hashed in production
      },
    })
  ])

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'API Documentation Project',
        description: 'Comprehensive documentation for REST API endpoints including authentication, rate limiting, and response examples.',
        status: 'ACTIVE',
        priority: 'HIGH',
        startDate: new Date('2025-01-01'),
        dueDate: new Date('2025-02-15'),
        budget: 5000,
        clientId: users[1].id, // Demo client
      },
    }),
    prisma.project.create({
      data: {
        title: 'User Manual Creation',
        description: 'Create comprehensive user manuals for software application including screenshots, step-by-step guides, and troubleshooting.',
        status: 'PLANNING',
        priority: 'MEDIUM',
        startDate: new Date('2025-01-15'),
        dueDate: new Date('2025-03-01'),
        budget: 3500,
        clientId: users[1].id,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Business Proposal Writing',
        description: 'Government contract proposal with compliance requirements and detailed technical specifications.',
        status: 'COMPLETED',
        priority: 'URGENT',
        startDate: new Date('2024-12-01'),
        dueDate: new Date('2024-12-31'),
        completedAt: new Date('2024-12-28'),
        budget: 8000,
        clientId: users[1].id,
      },
    })
  ])

  // Create milestones for projects
  await Promise.all([
    // API Documentation milestones
    prisma.milestone.create({
      data: {
        title: 'Research and Planning',
        description: 'Initial research and project planning phase',
        isCompleted: true,
        projectId: projects[0].id,
      },
    }),
    prisma.milestone.create({
      data: {
        title: 'API Endpoint Documentation',
        description: 'Document all API endpoints with examples',
        isCompleted: true,
        dueDate: new Date('2025-01-20'),
        projectId: projects[0].id,
      },
    }),
    prisma.milestone.create({
      data: {
        title: 'Integration Guides',
        description: 'Create integration guides and code examples',
        isCompleted: false,
        dueDate: new Date('2025-02-05'),
        projectId: projects[0].id,
      },
    }),
    prisma.milestone.create({
      data: {
        title: 'Final Review',
        description: 'Final review and quality assurance',
        isCompleted: false,
        dueDate: new Date('2025-02-15'),
        projectId: projects[0].id,
      },
    }),
    // User Manual milestones
    prisma.milestone.create({
      data: {
        title: 'Content Outline',
        description: 'Create detailed content outline and structure',
        isCompleted: false,
        dueDate: new Date('2025-01-25'),
        projectId: projects[1].id,
      },
    }),
    prisma.milestone.create({
      data: {
        title: 'Screenshots and Media',
        description: 'Capture and edit all required screenshots',
        isCompleted: false,
        dueDate: new Date('2025-02-10'),
        projectId: projects[1].id,
      },
    })
  ])

  // Create sample blog posts for CMS
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Complete Guide to Technical Writing in 2025',
        slug: 'complete-guide-technical-writing-2025',
        excerpt: 'Master the art of technical writing with our comprehensive guide covering best practices, tools, and industry trends.',
        content: '# The Complete Guide to Technical Writing in 2025\n\nTechnical writing has evolved significantly...',
        status: 'PUBLISHED',
        publishedAt: new Date('2025-01-01'),
        tags: JSON.stringify(['technical-writing', 'guide', 'best-practices']),
        metaTitle: 'Complete Guide to Technical Writing in 2025 | Prism Writing',
        metaDescription: 'Master technical writing with our 2025 guide. Learn best practices, tools, and trends.',
        readingTime: 12,
        viewCount: 1247,
        authorId: users[0].id, // Admin user
      },
    }),
    prisma.blogPost.create({
      data: {
        title: '10 Common API Documentation Mistakes to Avoid',
        slug: 'api-documentation-mistakes-avoid',
        excerpt: 'Learn about the most common API documentation mistakes and how to create better developer experiences.',
        content: '# 10 Common API Documentation Mistakes to Avoid\n\nAPI documentation is crucial for developer adoption...',
        status: 'PUBLISHED',
        publishedAt: new Date('2025-01-05'),
        tags: JSON.stringify(['api', 'documentation', 'mistakes', 'best-practices']),
        metaTitle: '10 API Documentation Mistakes to Avoid | Prism Writing',
        metaDescription: 'Avoid these common API documentation mistakes for better developer experience.',
        readingTime: 8,
        viewCount: 892,
        authorId: users[0].id,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Why Every SaaS Company Needs Professional Documentation',
        slug: 'saas-professional-documentation-importance',
        excerpt: 'Discover how professional documentation can reduce support costs and improve user experience.',
        content: '# Why Every SaaS Company Needs Professional Documentation\n\nIn the competitive SaaS landscape...',
        status: 'DRAFT',
        tags: JSON.stringify(['saas', 'documentation', 'business']),
        metaTitle: 'SaaS Documentation Importance | Prism Writing',
        metaDescription: 'Learn why professional documentation is essential for SaaS success.',
        readingTime: 6,
        viewCount: 0,
        authorId: users[0].id,
      },
    })
  ])

  // Create system logs for monitoring
  await Promise.all([
    prisma.systemLog.create({
      data: {
        level: 'INFO',
        message: 'User login successful',
        metadata: JSON.stringify({ userId: users[1].id, ip: '192.168.1.100' }),
        userId: users[1].id,
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }),
    prisma.systemLog.create({
      data: {
        level: 'WARN',
        message: 'High memory usage detected',
        metadata: JSON.stringify({ usage: '85%', threshold: '80%' }),
      },
    }),
    prisma.systemLog.create({
      data: {
        level: 'ERROR',
        message: 'Failed to send email notification',
        metadata: JSON.stringify({ error: 'SMTP timeout', recipient: 'test@example.com' }),
      },
    })
  ])

  console.log('✅ Seeding completed!')
  console.log(`📧 Created ${leads.length} sample leads`)
  console.log(`📊 Created ${analytics.length} analytics entries`)
  console.log(`📰 Created ${newsletter.length} newsletter subscribers`)
  console.log(`👥 Created ${users.length} sample users`)
  console.log(`📁 Created ${projects.length} projects`)
  console.log(` Created ${blogPosts.length} blog posts`)
  console.log(`🏗️ Phase 6 enterprise features seeded successfully!`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
