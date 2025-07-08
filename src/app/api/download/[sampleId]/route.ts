import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { sampleId: string } }
) {
  try {
    const { sampleId } = params
    
    // Map sample IDs to actual file names
    const fileMap: Record<string, { filename: string; name: string; contentType: string }> = {
      'meditech-sops': {
        filename: 'MediTech_SOPs_Healthcare_Sample.pdf',
        name: 'MediTech_SOPs_Healthcare_Sample.pdf',
        contentType: 'application/pdf'
      },
      'paymentpro-api': {
        filename: 'PaymentPro_API_Documentation_Sample.pdf',
        name: 'PaymentPro_API_Documentation_Sample.pdf',
        contentType: 'application/pdf'
      },
      'smartcity-manual': {
        filename: 'SmartCity_Installation_Manual_Sample.pdf',
        name: 'SmartCity_Installation_Manual_Sample.pdf',
        contentType: 'application/pdf'
      }
    }

    const fileInfo = fileMap[sampleId]
    if (!fileInfo) {
      return NextResponse.json(
        { error: 'Sample not found' },
        { status: 404 }
      )
    }

    // Check if user is authenticated for protected samples
    const authHeader = request.headers.get('authorization')
    const isAuthenticated = authHeader || request.cookies.get('customer_authenticated')?.value === 'true'

    // For demonstration, allow public access to samples
    // In production, you might want to check authentication for certain samples
    // if (!isAuthenticated && protectedSamples.includes(sampleId)) {
    //   return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    // }
    
    const filePath = join(process.cwd(), 'public', 'downloads', fileInfo.filename)
    
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const fileBuffer = await readFile(filePath)
    
    // Log download for analytics
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Download: ${fileInfo.name} - IP: ${forwardedFor} - User Agent: ${userAgent}`)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': fileInfo.contentType,
        'Content-Disposition': `attachment; filename="${fileInfo.name}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { sampleId: string } }
) {
  try {
    const { sampleId } = params
    
    const fileMap: Record<string, { filename: string; contentType: string }> = {
      'meditech-sops': {
        filename: 'MediTech_SOPs_Healthcare_Sample.pdf',
        contentType: 'application/pdf'
      },
      'paymentpro-api': {
        filename: 'PaymentPro_API_Documentation_Sample.pdf',
        contentType: 'application/pdf'
      },
      'smartcity-manual': {
        filename: 'SmartCity_Installation_Manual_Sample.pdf',
        contentType: 'application/pdf'
      }
    }

    const fileInfo = fileMap[sampleId]
    if (!fileInfo) {
      return new NextResponse(null, { status: 404 })
    }

    const filePath = join(process.cwd(), 'public', 'downloads', fileInfo.filename)
    
    if (!existsSync(filePath)) {
      return new NextResponse(null, { status: 404 })
    }

    const fileBuffer = await readFile(filePath)
    
    return new NextResponse(null, {
      headers: {
        'Content-Type': fileInfo.contentType,
        'Content-Length': fileBuffer.length.toString(),
      }
    })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}
