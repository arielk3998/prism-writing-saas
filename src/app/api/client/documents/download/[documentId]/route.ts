import { NextRequest, NextResponse } from 'next/server'
import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { documentId } = await params
    
    // Verify user authentication
    const userRole = request.headers.get('x-user-role')
    if (!userRole) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Find file by document ID (timestamp-based)
    const uploadDir = join(process.cwd(), 'uploads', 'client-documents')
    
    if (!existsSync(uploadDir)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Look for file with matching timestamp
    const files = await readdir(uploadDir)
    const matchingFile = files.find((file: string) => file.startsWith(documentId + '_'))
    
    if (!matchingFile) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    const filePath = join(uploadDir, matchingFile)
    const fileBuffer = await readFile(filePath)
    
    // Extract original filename from stored filename
    const originalName = matchingFile.replace(/^\d+_/, '') // Remove timestamp prefix
    const mimeType = getMimeType(originalName)
    
    // Log download for analytics
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Document Download: ${originalName} - User: ${userRole} - IP: ${forwardedFor}`)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${originalName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    })

  } catch (error) {
    console.error('Document download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
}

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const mimeTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'rtf': 'application/rtf',
    'odt': 'application/vnd.oasis.opendocument.text'
  }
  return mimeTypes[ext || ''] || 'application/octet-stream'
}
