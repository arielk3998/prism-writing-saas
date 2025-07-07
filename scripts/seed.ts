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

  console.log('✅ Seeding completed!')
  console.log(`📧 Created ${leads.length} sample leads`)
  console.log(`📊 Created ${analytics.length} analytics entries`)
  console.log(`📰 Created ${newsletter.length} newsletter subscribers`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
