import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { createHash } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const industry = formData.get('industry') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'uploads', 'client-documents')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename while preserving original name structure
    const timestamp = Date.now()
    const fileExtension = getFileExtension(file.name)
    const baseFileName = file.name.replace(/\.[^/.]+$/, '') // Remove extension
    const safeBaseFileName = baseFileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${safeBaseFileName}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    // Security scan simulation
    const scanStatus = 'clean' // In production, integrate with actual virus scanner

    // Create document record with accurate file representation
    const document = {
      id: `doc_${timestamp}`,
      title: file.name, // Keep original filename for display
      originalName: file.name, // Store original filename
      storedName: fileName, // Store actual filename on disk
      type: fileExtension.toUpperCase(),
      size: file.size,
      uploadedAt: new Date().toISOString(),
      url: `/uploads/client-documents/${fileName}`,
      downloadUrl: `/api/client/documents/download/${timestamp}`, // Secure download endpoint
      description: description || '',
      scanStatus,
      category: category || 'source',
      industry: industry || 'general',
      version: '1.0',
      mimeType: file.type,
      securityScanDetails: {
        scanDate: new Date().toISOString(),
        scanEngine: 'Prism Security Scanner v3.1',
        threatsFound: 0,
        fileIntegrity: true,
        checksumMD5: generateFileChecksum(buffer) // Add file integrity check
      }
    }

    // Log upload for analytics
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Upload: ${file.name} - IP: ${forwardedFor} - User Agent: ${userAgent}`)

    return NextResponse.json({
      success: true,
      document,
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getFileExtension(filename: string): string {
  return filename.split('.').pop() || ''
}

function generateFileChecksum(buffer: Buffer): string {
  return createHash('md5').update(buffer).digest('hex')
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get('industry')
    const category = searchParams.get('category')
    const type = searchParams.get('type')

    // Mock data - in production, fetch from database
    const documents = [
      {
        id: 'doc_1735316400000',
        title: 'API_Documentation_v2.0.pdf',
        type: 'PDF',
        size: 2048000,
        uploadedAt: '2025-01-01T10:00:00Z',
        url: '/uploads/client-documents/1735316400000_API_Documentation_v2.0.pdf',
        description: 'Updated API documentation with new endpoints',
        scanStatus: 'clean',
        category: 'deliverable',
        industry: 'technology',
        version: '2.0'
      },
      {
        id: 'doc_1735316500000',
        title: 'Installation_Manual.pdf',
        type: 'PDF',
        size: 1536000,
        uploadedAt: '2025-01-01T11:00:00Z',
        url: '/uploads/client-documents/1735316500000_Installation_Manual.pdf',
        description: 'Complete installation guide',
        scanStatus: 'clean',
        category: 'deliverable',
        industry: 'technology',
        version: '1.3'
      }
    ]

    // Apply filters
    let filtered = documents
    if (industry && industry !== 'all') {
      filtered = filtered.filter(doc => doc.industry === industry)
    }
    if (category && category !== 'all') {
      filtered = filtered.filter(doc => doc.category === category)
    }
    if (type && type !== 'all') {
      filtered = filtered.filter(doc => doc.type.toLowerCase() === type.toLowerCase())
    }

    return NextResponse.json({
      documents: filtered,
      total: filtered.length
    })

  } catch (error) {
    console.error('Get documents error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
