import { NextRequest, NextResponse } from 'next/server'
import { HebrewTranslationEntry } from '@/lib/hebrew-tracking'

// In-memory storage - in production, use secure database with encryption
const hebrewTranslations: HebrewTranslationEntry[] = []

export async function POST(request: NextRequest) {
  try {
    // Check superadmin authentication
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'superadmin') {
      return NextResponse.json(
        { error: 'Superadmin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { 
      type, 
      originalText, 
      translatedText, 
      context, 
      clientId, 
      clientName, 
      projectId, 
      translatorId,
      sensitivity = 'confidential',
      conflictRelated = true 
    } = body

    if (!originalText || !translatedText || !type) {
      return NextResponse.json(
        { error: 'Original text, translated text, and type are required' },
        { status: 400 }
      )
    }

    const entry: HebrewTranslationEntry = {
      id: `hebrew_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      type,
      originalText,
      translatedText,
      context: context || '',
      clientId,
      clientName,
      projectId,
      translatorId: translatorId || 'system',
      status: 'pending',
      sensitivity,
      conflictRelated,
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }

    hebrewTranslations.push(entry)

    // Log for audit trail
    console.log(`Hebrew Translation Recorded: ${entry.id} - Type: ${type} - Conflict Related: ${conflictRelated}`)

    return NextResponse.json({
      success: true,
      entryId: entry.id,
      message: 'Hebrew translation recorded in historical archive'
    })

  } catch (error) {
    console.error('Hebrew translation tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to record translation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check superadmin authentication
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'superadmin') {
      return NextResponse.json(
        { error: 'Superadmin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    const conflictOnly = searchParams.get('conflict') === 'true'
    const dateFrom = searchParams.get('from')
    const dateTo = searchParams.get('to')

    let filtered = hebrewTranslations

    if (conflictOnly) {
      filtered = filtered.filter(entry => entry.conflictRelated)
    }

    if (dateFrom) {
      filtered = filtered.filter(entry => entry.timestamp >= dateFrom)
    }

    if (dateTo) {
      filtered = filtered.filter(entry => entry.timestamp <= dateTo)
    }

    // Sort by timestamp descending
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    if (format === 'csv') {
      // Generate CSV for spreadsheet export
      const csvHeaders = [
        'ID', 'Timestamp', 'Type', 'Original Text', 'Translated Text', 
        'Context', 'Client ID', 'Client Name', 'Project ID', 'Translator ID',
        'Status', 'Sensitivity', 'Conflict Related', 'IP Address'
      ]
      
      const csvRows = filtered.map(entry => [
        entry.id,
        entry.timestamp,
        entry.type,
        `"${entry.originalText.replace(/"/g, '""')}"`,
        `"${entry.translatedText.replace(/"/g, '""')}"`,
        `"${entry.context.replace(/"/g, '""')}"`,
        entry.clientId || '',
        entry.clientName || '',
        entry.projectId || '',
        entry.translatorId,
        entry.status,
        entry.sensitivity,
        entry.conflictRelated,
        entry.ip
      ])

      const csv = [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="hebrew_translations_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return NextResponse.json({
      translations: filtered,
      total: filtered.length,
      conflictRelated: filtered.filter(t => t.conflictRelated).length,
      summary: {
        byType: {
          webpage: filtered.filter(t => t.type === 'webpage').length,
          document: filtered.filter(t => t.type === 'document').length,
          contract: filtered.filter(t => t.type === 'contract').length,
          communication: filtered.filter(t => t.type === 'communication').length
        },
        bySensitivity: {
          public: filtered.filter(t => t.sensitivity === 'public').length,
          confidential: filtered.filter(t => t.sensitivity === 'confidential').length,
          restricted: filtered.filter(t => t.sensitivity === 'restricted').length
        }
      }
    })

  } catch (error) {
    console.error('Hebrew translation retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve translations' },
      { status: 500 }
    )
  }
}
