import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        versions: {
          select: { id: true, versionNumber: true, createdAt: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const document = await prisma.document.create({
      data: {
        title: data.title,
        content: data.content || '',
        category: data.category || 'BUSINESS',
        type: data.type || 'CONTENT',
        authorId: data.authorId,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
    
    return NextResponse.json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
