import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the client ID from authentication
    // For now, we'll use a demo approach
    const searchParams = request.nextUrl.searchParams
    const clientId = searchParams.get('clientId') || 'demo-client'

    // Fetch projects for the client
    const projects = await prisma.project.findMany({
      where: {
        clientId: clientId
      },
      include: {
        milestones: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        tasks: {
          where: {
            status: {
              not: 'COMPLETED'
            }
          }
        },
        _count: {
          select: {
            tasks: true,
            documents: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate progress for each project
    const projectsWithProgress = projects.map(project => {
      const totalMilestones = project.milestones.length
      const completedMilestones = project.milestones.filter(m => m.isCompleted).length
      const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0

      return {
        ...project,
        progress
      }
    })

    return NextResponse.json({
      success: true,
      projects: projectsWithProgress
    })

  } catch (error) {
    console.error('Error fetching client projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
