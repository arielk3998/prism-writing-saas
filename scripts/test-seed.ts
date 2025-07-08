import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  try {
    // Create a simple lead
    const lead = await prisma.lead.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
        source: 'CONTACT_FORM',
        status: 'NEW',
        priority: 'MEDIUM',
      },
    })

    console.log('✅ Seeding completed successfully')
    console.log('Created lead:', lead.id)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
