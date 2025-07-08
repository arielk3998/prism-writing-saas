import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const customerId = url.searchParams.get('customerId')

    if (!customerId) {
      return NextResponse.json(
        { success: false, message: 'Customer ID is required' },
        { status: 400 }
      )
    }

    // Get customer basic info
    const customer = await prisma.user.findUnique({
      where: { 
        id: customerId,
        role: 'CLIENT',
        status: 'ACTIVE'
      }
    })

    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Customer not found' },
        { status: 404 }
      )
    }

    // Get customer's documents
    const documents = await prisma.document.findMany({
      where: { authorId: customerId },
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    // Mock some projects for demo
    const mockProjects = [
      {
        id: 'proj_1',
        title: 'API Documentation Project',
        description: 'Complete documentation for REST API endpoints',
        status: 'COMPLETED',
        priority: 'HIGH',
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-15'),
        milestones: [
          {
            id: 'milestone_1',
            title: 'Initial Documentation Draft',
            status: 'COMPLETED',
            dueDate: new Date('2024-11-15')
          },
          {
            id: 'milestone_2',
            title: 'Review and Revisions',
            status: 'COMPLETED',
            dueDate: new Date('2024-12-01')
          }
        ]
      }
    ]

    // Mock some additional documents for demo
    const mockDocuments = [
      {
        id: 'doc_1',
        title: 'API Documentation v2.1',
        type: 'TECHNICAL',
        status: 'COMPLETED',
        fileUrl: '/documents/api-docs-v2.1.pdf',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-15')
      },
      {
        id: 'doc_2', 
        title: 'User Manual - Customer Portal',
        type: 'DOCUMENTATION',
        status: 'COMPLETED',
        fileUrl: '/documents/user-manual.pdf',
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2024-11-20')
      },
      {
        id: 'doc_3',
        title: 'Business Proposal Draft',
        type: 'PROPOSAL',
        status: 'IN_REVIEW',
        fileUrl: '/documents/business-proposal-draft.docx',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-22')
      }
    ]

    const response = {
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email
      },
      documents: [...documents, ...mockDocuments],
      projects: mockProjects
    }

    return NextResponse.json({
      success: true,
      data: response
    })

  } catch (error) {
    console.error('Customer documents API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch customer data' },
      { status: 500 }
    )
  }
}
