import { prisma } from '@/lib/prisma'

export interface DashboardAnalytics {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  convertedLeads: number
  conversionRate: number
  leadsBySource: { source: string; count: number }[]
  leadsByStatus: { status: string; count: number }[]
  recentActivity: {
    id: string
    name: string | null
    email: string
    company: string | null
    status: string
    createdAt: Date
    source: string
  }[]
  monthlyTrends: {
    month: string
    leads: number
    conversions: number
  }[]
}

export class AnalyticsService {
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    try {
      // Get basic counts
      const [totalLeads, newLeads, contactedLeads, convertedLeads] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: 'NEW' } }),
        prisma.lead.count({ where: { status: 'CONTACTED' } }),
        prisma.lead.count({ where: { status: 'CONVERTED' } })
      ])

      // Calculate conversion rate
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

      // Get leads by source
      const leadsBySourceRaw = await prisma.lead.groupBy({
        by: ['source'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } }
      })

      const leadsBySource = leadsBySourceRaw.map(item => ({
        source: item.source,
        count: item._count.id
      }))

      // Get leads by status
      const leadsByStatusRaw = await prisma.lead.groupBy({
        by: ['status'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } }
      })

      const leadsByStatus = leadsByStatusRaw.map(item => ({
        status: item.status,
        count: item._count.id
      }))

      // Get recent activity (last 10 leads)
      const recentActivity = await prisma.lead.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          status: true,
          createdAt: true,
          source: true
        }
      })

      // Get monthly trends (last 6 months)
      const monthlyTrends = await this.getMonthlyTrends(6)

      return {
        totalLeads,
        newLeads,
        contactedLeads,
        convertedLeads,
        conversionRate: Math.round(conversionRate * 100) / 100,
        leadsBySource,
        leadsByStatus,
        recentActivity,
        monthlyTrends
      }
    } catch (error) {
      console.error('Analytics service error:', error)
      throw new Error('Failed to fetch dashboard analytics')
    }
  }

  private async getMonthlyTrends(months: number) {
    const trends = []
    const now = new Date()

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' })

      const [leadsCount, conversionsCount] = await Promise.all([
        prisma.lead.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextMonth
            }
          }
        }),
        prisma.lead.count({
          where: {
            status: 'CONVERTED',
            createdAt: {
              gte: date,
              lt: nextMonth
            }
          }
        })
      ])

      trends.push({
        month: monthName,
        leads: leadsCount,
        conversions: conversionsCount
      })
    }

    return trends
  }

  async getLeadScoring(): Promise<Array<{
    id: string
    name: string | null
    email: string
    company: string | null
    message: string | null
    status: string
    createdAt: Date
    score: number
    factors: string[]
    priority: string
  }>> {
    // Advanced lead scoring algorithm
    const leads = await prisma.lead.findMany({
      where: { status: { in: ['NEW', 'CONTACTED'] } },
      orderBy: { createdAt: 'desc' }
    })

    return leads.map(lead => {
      let score = 0
      const factors = []

      // Company provided (+20 points)
      if (lead.company) {
        score += 20
        factors.push('Has company information')
      }

      // Detailed message (+15 points)
      if (lead.message && lead.message.length > 100) {
        score += 15
        factors.push('Detailed inquiry message')
      }

      // Recent submission (+10 points if within 24 hours)
      const hoursSinceSubmission = (Date.now() - lead.createdAt.getTime()) / (1000 * 60 * 60)
      if (hoursSinceSubmission < 24) {
        score += 10
        factors.push('Recent submission')
      }

      // Professional email domain (+10 points)
      const emailDomain = lead.email.split('@')[1]
      if (emailDomain && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(emailDomain)) {
        score += 10
        factors.push('Professional email domain')
      }

      // Specific project type mentioned (+15 points)
      const projectKeywords = ['technical writing', 'documentation', 'content strategy', 'copywriting', 'proposal']
      if (lead.message && projectKeywords.some(keyword => 
        lead.message!.toLowerCase().includes(keyword))) {
        score += 15
        factors.push('Specific service request')
      }

      // Urgency indicators (+20 points)
      const urgencyKeywords = ['urgent', 'asap', 'deadline', 'rush', 'immediate']
      if (lead.message && urgencyKeywords.some(keyword => 
        lead.message!.toLowerCase().includes(keyword))) {
        score += 20
        factors.push('Urgency indicators')
      }

      return {
        ...lead,
        score,
        factors,
        priority: score >= 60 ? 'HIGH' : score >= 30 ? 'MEDIUM' : 'LOW'
      }
    }).sort((a, b) => b.score - a.score)
  }
}

export const analyticsService = new AnalyticsService()
