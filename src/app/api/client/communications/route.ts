import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In a real app, you'd get the client ID from authentication
    // const searchParams = request.nextUrl.searchParams
    // const clientId = searchParams.get('clientId') || 'demo-client'

    // For now, return mock data since the tables are new
    const mockCommunications = [
      {
        id: '1',
        subject: 'Welcome to Your Project!',
        message: 'We are excited to work with you on your technical writing project. Our team has reviewed your requirements and we will begin work shortly.',
        createdAt: new Date().toISOString(),
        isRead: false,
        sender: {
          name: 'Prism Writing Team'
        }
      },
      {
        id: '2',
        subject: 'Project Update - Phase 1 Complete',
        message: 'Great news! We have completed the first phase of your project. Please review the documents in your project portal.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
        sender: {
          name: 'Sarah Johnson'
        }
      }
    ]

    return NextResponse.json({
      success: true,
      communications: mockCommunications
    })

  } catch (error) {
    console.error('Error fetching client communications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch communications' },
      { status: 500 }
    )
  }
}
