import { NextRequest, NextResponse } from 'next/server'
import { analyticsService } from '@/lib/analytics'
import { verifyAdminAuth, createAuthResponse } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  // Check admin authentication
  if (!verifyAdminAuth(request)) {
    return createAuthResponse()
  }

  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'dashboard'

    switch (type) {
      case 'dashboard':
        const dashboardData = await analyticsService.getDashboardAnalytics()
        return NextResponse.json({ success: true, data: dashboardData })
        
      case 'lead-scoring':
        const leadScoring = await analyticsService.getLeadScoring()
        return NextResponse.json({ success: true, data: leadScoring })
        
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid analytics type' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
