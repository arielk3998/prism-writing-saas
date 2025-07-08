import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsEvent {
  event: string
  properties: Record<string, unknown>
  userId?: string
  sessionId?: string
  timestamp: string
  userAgent: string
  ip: string
  page?: string
  referrer?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, userId, sessionId, page, referrer } = body

    if (!event) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      )
    }

    // Collect analytics data
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: properties || {},
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      page,
      referrer
    }

    // Log to console for development
    console.log('Analytics Event:', JSON.stringify(analyticsEvent, null, 2))

    // Store critical events
    if (['contact_form_submit', 'document_download', 'payment_completed', 'user_registered'].includes(event)) {
      await storeImportantEvent(analyticsEvent)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const analyticsType = searchParams.get('type') || 'dashboard'

    let mockData

    if (analyticsType === 'lead-scoring') {
      mockData = {
        leadScoring: {
          totalLeads: 156,
          qualifiedLeads: 47,
          conversionRate: 30.1,
          averageScore: 72.3
        },
        leadSources: [
          { source: 'Contact Form', leads: 78, conversion: 35.9 },
          { source: 'Newsletter', leads: 45, conversion: 22.2 },
          { source: 'Gallery Downloads', leads: 33, conversion: 33.3 }
        ],
        timeRange: {
          start: startDate || '2025-01-01',
          end: endDate || new Date().toISOString().split('T')[0]
        }
      }
    } else {
      mockData = {
        summary: {
          totalVisitors: 1247,
          totalPageViews: 3892,
          contactForms: 23,
          documentDownloads: 156,
          conversionRate: 1.8,
          bounceRate: 45.2,
          avgSessionDuration: '3:24'
        },
        events: [
          { event: 'page_view', count: 3892, uniqueUsers: 1247 },
          { event: 'document_download', count: 156, uniqueUsers: 89 },
          { event: 'contact_form_submit', count: 23, uniqueUsers: 23 },
          { event: 'newsletter_signup', count: 67, uniqueUsers: 67 }
        ],
        topPages: [
          { page: '/', views: 1456, bounceRate: 32.1 },
          { page: '/gallery', views: 892, bounceRate: 28.7 },
          { page: '/about', views: 567, bounceRate: 51.2 },
          { page: '/contact', views: 445, bounceRate: 12.8 },
          { page: '/client', views: 532, bounceRate: 15.4 }
        ],
        referrers: [
          { source: 'google.com', visits: 768, conversion: 2.1 },
          { source: 'direct', visits: 445, conversion: 3.8 },
          { source: 'linkedin.com', visits: 34, conversion: 8.8 }
        ],
        demographics: {
          countries: [
            { country: 'United States', visitors: 892 },
            { country: 'Canada', visitors: 123 },
            { country: 'United Kingdom', visitors: 98 },
            { country: 'Australia', visitors: 67 }
          ],
          devices: [
            { device: 'Desktop', percentage: 68.4 },
            { device: 'Mobile', percentage: 24.1 },
            { device: 'Tablet', percentage: 7.5 }
          ]
        },
        timeRange: {
          start: startDate || '2025-01-01',
          end: endDate || new Date().toISOString().split('T')[0]
        }
      }
    }

    return NextResponse.json(mockData)

  } catch (error) {
    console.error('Analytics retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    )
  }
}

async function storeImportantEvent(event: AnalyticsEvent) {
  // In production, store in database
  console.log('IMPORTANT EVENT:', {
    event: event.event,
    userId: event.userId,
    timestamp: event.timestamp,
    properties: event.properties
  })
}
