import { prisma } from '@/lib/prisma';
import { Lead, Deal, LeadActivity, LeadNote, DealActivity } from '@prisma/client';

export interface CreateLeadRequest {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  website?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  message?: string;
  source?: 'CONTACT_FORM' | 'NEWSLETTER' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'DIRECT';
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface UpdateLeadRequest {
  name?: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  website?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  temperature?: 'COLD' | 'WARM' | 'HOT';
  assignedTo?: string;
  nextFollowUp?: Date;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface CreateDealRequest {
  leadId: string;
  title: string;
  description?: string;
  value?: number;
  currency?: string;
  stage?: 'PROSPECTING' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  probability?: number;
  expectedCloseDate?: Date;
  source?: string;
}

export interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageScore: number;
  leadsBySource: Record<string, number>;
  leadsByStatus: Record<string, number>;
}

export class CRMService {
  // CREATE LEAD
  static async createLead(data: CreateLeadRequest): Promise<Lead> {
    try {
      // Check if lead already exists
      const existingLead = await prisma.lead.findUnique({
        where: { email: data.email }
      });

      if (existingLead) {
        throw new Error('Lead with this email already exists');
      }

      // Calculate initial score
      const score = this.calculateLeadScore(data);

      const lead = await prisma.lead.create({
        data: {
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone,
          jobTitle: data.jobTitle,
          website: data.website,
          industry: data.industry,
          employees: data.employees,
          revenue: data.revenue,
          message: data.message,
          source: data.source || 'CONTACT_FORM',
          score,
          temperature: 'COLD',
          tags: data.tags ? JSON.stringify(data.tags) : null,
          customFields: data.customFields ? JSON.stringify(data.customFields) : null,
        }
      });

      // Log activity
      await this.logLeadActivity(lead.id, 'LEAD_CREATED', 'New lead created');

      // Calculate and store lead score
      await this.updateLeadScore(lead.id, score);

      return lead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  // UPDATE LEAD
  static async updateLead(leadId: string, data: UpdateLeadRequest): Promise<Lead> {
    try {
      const lead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          name: data.name,
          company: data.company,
          phone: data.phone,
          jobTitle: data.jobTitle,
          website: data.website,
          industry: data.industry,
          employees: data.employees,
          revenue: data.revenue,
          status: data.status,
          priority: data.priority,
          temperature: data.temperature,
          assignedTo: data.assignedTo,
          nextFollowUp: data.nextFollowUp,
          tags: data.tags ? JSON.stringify(data.tags) : undefined,
          customFields: data.customFields ? JSON.stringify(data.customFields) : undefined,
          lastContactedAt: new Date(),
        }
      });

      // Log activity
      await this.logLeadActivity(leadId, 'LEAD_UPDATED', 'Lead information updated');

      // Recalculate score if relevant data changed
      if (data.company || data.industry || data.revenue || data.employees) {
        const newScore = this.calculateLeadScore({
          email: lead.email,
          company: lead.company || undefined,
          industry: lead.industry || undefined,
          revenue: lead.revenue || undefined,
          employees: lead.employees || undefined,
        });
        await this.updateLeadScore(leadId, newScore);
      }

      return lead;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  // GET LEADS WITH FILTERS
  static async getLeads(filters: {
    status?: string;
    source?: string;
    priority?: string;
    temperature?: string;
    assignedTo?: string;
    industry?: string;
    minScore?: number;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const skip = (page - 1) * limit;

      const where: any = {};

      // Apply filters
      if (filters.status) where.status = filters.status;
      if (filters.source) where.source = filters.source;
      if (filters.priority) where.priority = filters.priority;
      if (filters.temperature) where.temperature = filters.temperature;
      if (filters.assignedTo) where.assignedTo = filters.assignedTo;
      if (filters.industry) where.industry = filters.industry;
      if (filters.minScore) where.score = { gte: filters.minScore };

      // Search across multiple fields
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
          { company: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          include: {
            activities: {
              take: 5,
              orderBy: { createdAt: 'desc' }
            },
            notes: {
              take: 3,
              orderBy: { createdAt: 'desc' }
            }
          },
          orderBy: [
            { priority: 'desc' },
            { score: 'desc' },
            { createdAt: 'desc' }
          ],
          skip,
          take: limit,
        }),
        prisma.lead.count({ where })
      ]);

      return {
        leads,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  // CREATE DEAL
  static async createDeal(data: CreateDealRequest): Promise<Deal> {
    try {
      const deal = await prisma.deal.create({
        data: {
          leadId: data.leadId,
          title: data.title,
          description: data.description,
          value: data.value,
          currency: data.currency || 'USD',
          stage: data.stage || 'PROSPECTING',
          probability: data.probability || 10,
          expectedCloseDate: data.expectedCloseDate,
          source: data.source,
        }
      });

      // Log activity
      await this.logDealActivity(deal.id, 'CALL', `Deal created: ${data.title}`);

      // Update lead status if creating first deal
      await prisma.lead.update({
        where: { id: data.leadId },
        data: { 
          status: 'QUALIFIED',
          lastContactedAt: new Date()
        }
      });

      return deal;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  }

  // UPDATE DEAL STAGE
  static async updateDealStage(dealId: string, stage: string, notes?: string): Promise<Deal> {
    try {
      const deal = await prisma.deal.update({
        where: { id: dealId },
        data: { 
          stage: stage as any,
          ...(stage === 'CLOSED_WON' && { actualCloseDate: new Date() }),
          ...(stage === 'CLOSED_LOST' && { actualCloseDate: new Date() }),
        }
      });

      // Log activity
      await this.logDealActivity(dealId, 'NOTE', `Deal moved to ${stage}${notes ? ': ' + notes : ''}`);

      // Update lead status if deal is won
      if (stage === 'CLOSED_WON') {
        await prisma.lead.update({
          where: { id: deal.leadId },
          data: { 
            status: 'CONVERTED',
            convertedAt: new Date()
          }
        });
      }

      return deal;
    } catch (error) {
      console.error('Error updating deal stage:', error);
      throw error;
    }
  }

  // LOG LEAD ACTIVITY
  static async logLeadActivity(leadId: string, type: string, description: string, metadata?: any): Promise<LeadActivity> {
    try {
      return await prisma.leadActivity.create({
        data: {
          leadId,
          activityType: type,
          description,
          metadata: metadata ? JSON.stringify(metadata) : null,
        }
      });
    } catch (error) {
      console.error('Error logging lead activity:', error);
      throw error;
    }
  }

  // LOG DEAL ACTIVITY
  static async logDealActivity(dealId: string, type: 'CALL' | 'EMAIL' | 'MEETING' | 'DEMO' | 'PROPOSAL' | 'FOLLOW_UP' | 'NOTE', description: string, scheduledFor?: Date, result?: string): Promise<DealActivity> {
    try {
      return await prisma.dealActivity.create({
        data: {
          dealId,
          type,
          description,
          scheduledFor,
          result,
          ...(type !== 'NOTE' && !scheduledFor && { completedAt: new Date() }),
        }
      });
    } catch (error) {
      console.error('Error logging deal activity:', error);
      throw error;
    }
  }

  // ADD LEAD NOTE
  static async addLeadNote(leadId: string, content: string, authorId: string, isPrivate: boolean = false): Promise<LeadNote> {
    try {
      const note = await prisma.leadNote.create({
        data: {
          leadId,
          content,
          authorId,
          isPrivate,
        }
      });

      // Log activity
      await this.logLeadActivity(leadId, 'NOTE_ADDED', `Note added: ${content.substring(0, 50)}...`);

      return note;
    } catch (error) {
      console.error('Error adding lead note:', error);
      throw error;
    }
  }

  // CALCULATE LEAD SCORE
  static calculateLeadScore(data: Partial<CreateLeadRequest>): number {
    let score = 0;

    // Company size scoring
    if (data.employees) {
      const employees = parseInt(data.employees);
      if (employees > 1000) score += 30;
      else if (employees > 100) score += 20;
      else if (employees > 10) score += 10;
      else score += 5;
    }

    // Revenue scoring
    if (data.revenue) {
      const revenue = data.revenue.toLowerCase();
      if (revenue.includes('10m+') || revenue.includes('10,000,000+')) score += 40;
      else if (revenue.includes('1m+') || revenue.includes('1,000,000+')) score += 30;
      else if (revenue.includes('100k+') || revenue.includes('100,000+')) score += 20;
      else score += 10;
    }

    // Industry scoring
    if (data.industry) {
      const highValueIndustries = ['technology', 'finance', 'healthcare', 'manufacturing'];
      if (highValueIndustries.some(industry => 
        data.industry!.toLowerCase().includes(industry)
      )) {
        score += 20;
      } else {
        score += 10;
      }
    }

    // Job title scoring
    if (data.jobTitle) {
      const decisionMakers = ['ceo', 'cto', 'cmo', 'vp', 'director', 'manager', 'head'];
      if (decisionMakers.some(title => 
        data.jobTitle!.toLowerCase().includes(title)
      )) {
        score += 25;
      } else {
        score += 10;
      }
    }

    // Company website scoring
    if (data.website) score += 15;

    // Phone provided scoring
    if (data.phone) score += 10;

    return Math.min(score, 100); // Cap at 100
  }

  // UPDATE LEAD SCORE
  static async updateLeadScore(leadId: string, score: number): Promise<void> {
    try {
      await prisma.lead.update({
        where: { id: leadId },
        data: { score }
      });

      await prisma.leadScore.create({
        data: {
          leadId,
          score,
          factors: JSON.stringify({ calculatedAt: new Date(), algorithm: 'v1.0' }),
        }
      });
    } catch (error) {
      console.error('Error updating lead score:', error);
    }
  }

  // GET CRM METRICS
  static async getCRMMetrics(dateRange?: { from: Date; to: Date }): Promise<LeadMetrics> {
    try {
      const where = dateRange ? {
        createdAt: {
          gte: dateRange.from,
          lte: dateRange.to,
        }
      } : {};

      const [
        totalLeads,
        newLeads,
        qualifiedLeads,
        convertedLeads,
        leadsBySource,
        leadsByStatus,
        averageScoreData
      ] = await Promise.all([
        prisma.lead.count({ where }),
        prisma.lead.count({ where: { ...where, status: 'NEW' } }),
        prisma.lead.count({ where: { ...where, status: 'QUALIFIED' } }),
        prisma.lead.count({ where: { ...where, status: 'CONVERTED' } }),
        prisma.lead.groupBy({
          by: ['source'],
          where,
          _count: { id: true },
        }),
        prisma.lead.groupBy({
          by: ['status'],
          where,
          _count: { id: true },
        }),
        prisma.lead.aggregate({
          where,
          _avg: { score: true },
        }),
      ]);

      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      const averageScore = averageScoreData._avg.score || 0;

      return {
        totalLeads,
        newLeads,
        qualifiedLeads,
        convertedLeads,
        conversionRate: Math.round(conversionRate * 100) / 100,
        averageScore: Math.round(averageScore * 100) / 100,
        leadsBySource: leadsBySource.reduce((acc, item) => {
          acc[item.source] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
        leadsByStatus: leadsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      };
    } catch (error) {
      console.error('Error fetching CRM metrics:', error);
      throw error;
    }
  }

  // GET DEAL PIPELINE
  static async getDealPipeline() {
    try {
      const deals = await prisma.deal.findMany({
        where: {
          stage: {
            not: 'CLOSED_LOST'
          }
        },
        include: {
          lead: {
            select: {
              name: true,
              company: true,
              email: true
            }
          }
        },
        orderBy: [
          { expectedCloseDate: 'asc' },
          { value: 'desc' }
        ]
      });

      const pipeline = deals.reduce((acc, deal) => {
        if (!acc[deal.stage]) {
          acc[deal.stage] = {
            deals: [],
            totalValue: 0,
            count: 0
          };
        }
        acc[deal.stage].deals.push(deal);
        acc[deal.stage].totalValue += deal.value || 0;
        acc[deal.stage].count += 1;
        return acc;
      }, {} as Record<string, any>);

      return pipeline;
    } catch (error) {
      console.error('Error fetching deal pipeline:', error);
      throw error;
    }
  }

  // BULK IMPORT LEADS
  static async bulkImportLeads(leads: CreateLeadRequest[]): Promise<{ success: number; errors: string[] }> {
    let success = 0;
    const errors: string[] = [];

    for (const leadData of leads) {
      try {
        await this.createLead(leadData);
        success++;
      } catch (error) {
        errors.push(`Error importing ${leadData.email}: ${error}`);
      }
    }

    return { success, errors };
  }
}
