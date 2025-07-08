import { NextRequest, NextResponse } from 'next/server'

interface ClientContract {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  contractType: 'service_agreement' | 'nda' | 'master_agreement' | 'project_specific'
  status: 'draft' | 'sent' | 'signed' | 'executed' | 'expired'
  createdAt: string
  signedAt?: string
  expiresAt?: string
  scope: string
  deliverables: string[]
  deadlines: { milestone: string; date: string; completed?: boolean }[]
  fees: {
    amount: number
    currency: string
    schedule: 'upfront' | 'milestone' | 'monthly' | 'completion'
    paid?: number
  }
  terms: {
    confidentiality: boolean
    intellectualProperty: string
    termination: string
    disputeResolution: string
    governingLaw: string
  }
  documents: {
    contract: string
    nda?: string
    amendments?: string[]
  }
  signatures: {
    client: { name: string; date?: string; ip?: string }
    prism: { name: string; date?: string; ip?: string }
  }
  hebrewTranslation?: {
    required: boolean
    completed: boolean
    translationId?: string
  }
}

interface NDATemplate {
  id: string
  name: string
  level: 'standard' | 'enhanced' | 'maximum'
  template: string
  applicableRegions: string[]
  lastUpdated: string
}

// In-memory storage - in production, use secure database
const contracts: ClientContract[] = []
const ndaTemplates: NDATemplate[] = [
  {
    id: 'nda_standard',
    name: 'Standard NDA - Technical Writing',
    level: 'standard',
    template: `
MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into on [DATE] by and between:

Prism Writing Professional Services
[ADDRESS]
("Prism Writing")

AND

[CLIENT_NAME]
[CLIENT_ADDRESS]
("Client")

1. CONFIDENTIAL INFORMATION
Both parties acknowledge they may receive confidential information including but not limited to:
- Technical documentation and specifications
- Business processes and procedures
- Client data and proprietary information
- Translation work and methodologies
- Project details and timelines

2. OBLIGATIONS
Both parties agree to:
- Keep all confidential information strictly confidential
- Use confidential information solely for the purpose of evaluating potential business relationship
- Not disclose confidential information to third parties
- Return or destroy confidential information upon request

3. TERM
This Agreement shall remain in effect for 3 years from the date of signing.

4. GOVERNING LAW
This Agreement shall be governed by the laws of [JURISDICTION].

[SIGNATURE_BLOCKS]
    `,
    applicableRegions: ['US', 'EU', 'IL'],
    lastUpdated: '2025-01-01'
  },
  {
    id: 'nda_enhanced',
    name: 'Enhanced NDA - Sensitive Projects',
    level: 'enhanced',
    template: `
ENHANCED MUTUAL NON-DISCLOSURE AGREEMENT

[Enhanced template with additional clauses for sensitive projects, including specific provisions for translation work during geopolitical situations]
    `,
    applicableRegions: ['US', 'EU', 'IL'],
    lastUpdated: '2025-01-01'
  }
]

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (!['admin', 'superadmin'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action } = body

    if (action === 'create_contract') {
      const {
        clientId,
        clientName,
        clientEmail,
        contractType,
        scope,
        deliverables,
        deadlines,
        fees,
        hebrewTranslationRequired = false
      } = body

      if (!clientId || !clientName || !clientEmail || !scope) {
        return NextResponse.json(
          { error: 'Client ID, name, email, and scope are required' },
          { status: 400 }
        )
      }

      const contract: ClientContract = {
        id: `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        clientId,
        clientName,
        clientEmail,
        contractType: contractType || 'service_agreement',
        status: 'draft',
        createdAt: new Date().toISOString(),
        scope,
        deliverables: deliverables || [],
        deadlines: deadlines || [],
        fees: fees || { amount: 0, currency: 'USD', schedule: 'completion' },
        terms: {
          confidentiality: true,
          intellectualProperty: 'Client retains ownership of original content. Prism Writing retains rights to methodologies.',
          termination: '30 days written notice',
          disputeResolution: 'Binding arbitration',
          governingLaw: 'State of [CLIENT_STATE] / Israeli Law for international clients'
        },
        documents: {
          contract: `contract_${Date.now()}.pdf`
        },
        signatures: {
          client: { name: clientName },
          prism: { name: 'Ariel Karagodskiy' }
        },
        hebrewTranslation: {
          required: hebrewTranslationRequired,
          completed: false
        }
      }

      contracts.push(contract)

      // Automatically create NDA if required
      if (contractType === 'nda' || hebrewTranslationRequired) {
        await createNDAForContract(contract)
      }

      // Track Hebrew translation requirement
      if (hebrewTranslationRequired) {
        const translationId = await trackContractTranslation(contract)
        contract.hebrewTranslation!.translationId = translationId
      }

      console.log(`Contract created: ${contract.id} for client: ${clientName}`)

      return NextResponse.json({
        success: true,
        contract,
        message: 'Contract created successfully'
      })
    }

    if (action === 'generate_nda') {
      const { clientName, clientAddress, level = 'standard', jurisdiction = 'US' } = body

      const template = ndaTemplates.find(t => t.level === level)
      if (!template) {
        return NextResponse.json(
          { error: 'NDA template not found' },
          { status: 404 }
        )
      }

      const nda = template.template
        .replace('[DATE]', new Date().toLocaleDateString())
        .replace('[CLIENT_NAME]', clientName)
        .replace('[CLIENT_ADDRESS]', clientAddress)
        .replace('[JURISDICTION]', jurisdiction)

      return NextResponse.json({
        success: true,
        nda,
        template: template.name,
        level: template.level
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Contract management error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (!['admin', 'superadmin'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    let filtered = contracts

    if (clientId) {
      filtered = filtered.filter(contract => contract.clientId === clientId)
    }

    if (status) {
      filtered = filtered.filter(contract => contract.status === status)
    }

    if (type) {
      filtered = filtered.filter(contract => contract.contractType === type)
    }

    // Sort by creation date descending
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      contracts: filtered,
      total: filtered.length,
      summary: {
        byStatus: {
          draft: contracts.filter(c => c.status === 'draft').length,
          sent: contracts.filter(c => c.status === 'sent').length,
          signed: contracts.filter(c => c.status === 'signed').length,
          executed: contracts.filter(c => c.status === 'executed').length
        },
        withHebrewTranslation: contracts.filter(c => c.hebrewTranslation?.required).length,
        ndaTemplates
      }
    })

  } catch (error) {
    console.error('Contract retrieval error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function createNDAForContract(contract: ClientContract) {
  // Auto-generate NDA based on contract sensitivity
  const level = contract.hebrewTranslation?.required ? 'enhanced' : 'standard'
  contract.documents.nda = `nda_${contract.id}.pdf`
  console.log(`NDA generated for contract: ${contract.id} - Level: ${level}`)
}

async function trackContractTranslation(contract: ClientContract): Promise<string> {
  // This would call the Hebrew translation tracking API
  console.log(`Hebrew translation tracking initiated for contract: ${contract.id}`)
  return `translation_${Date.now()}`
}
