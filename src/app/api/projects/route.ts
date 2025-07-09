import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { 
        client: {
          select: { id: true, name: true, email: true }
        },
        tasks: {
          select: { id: true, title: true, status: true, dueDate: true }
        }
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || 'PLANNING',
        clientId: data.clientId,
        budget: data.budget || 0,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
      include: {
        client: {
          select: { id: true, name: true, email: true }
        }
      }
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
