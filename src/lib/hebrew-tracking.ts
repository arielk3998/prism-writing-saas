interface HebrewTranslationEntry {
  id: string
  timestamp: string
  type: 'webpage' | 'document' | 'contract' | 'communication'
  originalText: string
  translatedText: string
  context: string
  clientId?: string
  clientName?: string
  projectId?: string
  translatorId: string
  status: 'pending' | 'reviewed' | 'approved' | 'archived'
  sensitivity: 'public' | 'confidential' | 'restricted'
  conflictRelated: boolean
  archiveReason?: string
  userAgent: string
  ip: string
}

// Helper function to automatically track Hebrew content
export async function trackHebrewContent(
  originalText: string,
  translatedText: string,
  type: HebrewTranslationEntry['type'],
  context: string = '',
  clientInfo?: { id?: string; name?: string; projectId?: string }
) {
  const entry: Omit<HebrewTranslationEntry, 'userAgent' | 'ip'> = {
    id: `hebrew_auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    type,
    originalText,
    translatedText,
    context,
    clientId: clientInfo?.id,
    clientName: clientInfo?.name,
    projectId: clientInfo?.projectId,
    translatorId: 'auto-system',
    status: 'pending',
    sensitivity: 'confidential',
    conflictRelated: true
  }

  console.log(`Auto-tracked Hebrew translation: ${entry.id}`)
  return entry.id
}

export type { HebrewTranslationEntry }
