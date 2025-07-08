import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'projectType']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // In production, this would save to a database
    const assessmentData = {
      id: `assessment_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...formData,
      status: 'pending_review',
      automationRecommendations: generateAutomationRecommendations(formData)
    }

    // Log the assessment for now (in production, save to database)
    console.log('New client assessment:', assessmentData)

    // Simulate AI analysis for automation recommendations
    const response = {
      success: true,
      assessmentId: assessmentData.id,
      message: 'Assessment submitted successfully',
      recommendations: assessmentData.automationRecommendations,
      estimatedTimeline: calculateTimeline(formData),
      nextSteps: [
        'Our AI agents will analyze your requirements',
        'Document templates will be automatically generated',
        'A project manager will contact you within 24 hours',
        'Initial draft documents will be ready within 3-5 business days'
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateAutomationRecommendations(formData: Record<string, unknown>) {
  const recommendations = []

  // AI Translation recommendations
  if (Array.isArray(formData.languages) && formData.languages.length > 1) {
    recommendations.push({
      type: 'translation',
      description: 'Multi-language document automation using DeepL and Google Translate APIs',
      estimatedSavings: '60-80% time reduction for translation workflows'
    })
  }

  // Document conversion recommendations
  if (Array.isArray(formData.formatPreferences) && formData.formatPreferences.length > 1) {
    recommendations.push({
      type: 'conversion',
      description: 'Automated format conversion using Pandoc and specialized APIs',
      estimatedSavings: '90% time reduction for format conversions'
    })
  }

  // Compliance automation
  if (Array.isArray(formData.complianceStandards) && formData.complianceStandards.length > 0) {
    recommendations.push({
      type: 'compliance',
      description: 'Automated compliance checking against industry standards',
      estimatedSavings: '70% reduction in compliance review time'
    })
  }

  // Version control automation
  if (formData.revisionCycles === 'frequent') {
    recommendations.push({
      type: 'version_control',
      description: 'Automated version tracking and change management using Git APIs',
      estimatedSavings: '85% reduction in version management overhead'
    })
  }

  return recommendations
}

function calculateTimeline(formData: Record<string, unknown>) {
  let baseTime = 5 // base 5 days

  // Adjust based on project scope
  if (formData.projectScope === 'large') baseTime += 10
  else if (formData.projectScope === 'medium') baseTime += 5

  // Adjust based on document types
  if (Array.isArray(formData.documentTypes) && formData.documentTypes.length > 3) {
    baseTime += formData.documentTypes.length
  }

  // Adjust based on compliance requirements
  if (Array.isArray(formData.complianceStandards) && formData.complianceStandards.length > 0) {
    baseTime += formData.complianceStandards.length * 2
  }

  return {
    estimated: `${baseTime} business days`,
    withAutomation: `${Math.ceil(baseTime * 0.4)} business days`,
    savings: `${Math.round((1 - 0.4) * 100)}% faster with AI automation`
  }
}
