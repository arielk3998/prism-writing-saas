'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  BookOpen,
  Shield,
  Target,
  RefreshCw
} from 'lucide-react'

interface AIContentGeneratorProps {
  className?: string
}

interface ContentRequest {
  topic: string
  industry: string
  documentType: string
  requirements: string[]
}

interface ContentIterationResult {
  iteration: number
  content: string
  accuracy: number
  issues: string[]
  sources: PeerReviewedSource[]
  improvements: string[]
}

interface PeerReviewedSource {
  title: string
  authors: string[]
  journal: string
  year: number
  doi?: string
  url: string
  relevanceScore: number
  credibilityScore: number
  summary: string
}

interface GenerationResult {
  finalContent: string
  totalIterations: number
  finalAccuracy: number
  iterations: ContentIterationResult[]
  verifiedSources: PeerReviewedSource[]
  complianceChecks: {
    industryStandards: boolean
    regulatoryCompliance: boolean
    peerReviewValidation: boolean
    factualAccuracy: boolean
  }
}

export function AIContentGenerator({ className = '' }: AIContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [request, setRequest] = useState<ContentRequest>({
    topic: '',
    industry: 'software',
    documentType: 'technical-documentation',
    requirements: []
  })
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const industries = [
    { value: 'software', label: 'Software Development & IT' },
    { value: 'healthcare', label: 'Healthcare & Medical Devices' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'legal', label: 'Legal & Compliance' },
    { value: 'scientific', label: 'Scientific & Research' }
  ]

  const documentTypes = [
    { value: 'technical-documentation', label: 'Technical Documentation' },
    { value: 'compliance-manual', label: 'Compliance Manual' },
    { value: 'api-documentation', label: 'API Documentation' },
    { value: 'user-manual', label: 'User Manual' },
    { value: 'training-material', label: 'Training Material' },
    { value: 'regulatory-submission', label: 'Regulatory Submission' }
  ]

  const handleGenerate = async () => {
    if (!request.topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/ai-content-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
      }

      setResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const addRequirement = () => {
    setRequest(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setRequest(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const removeRequirement = (index: number) => {
    setRequest(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Content Generation System
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Generate industry-compliant documentation using peer-reviewed sources and iterative accuracy verification. 
          Content is only released when 100% accuracy is achieved.
        </p>
      </div>

      {/* Process Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Search className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Find Sources</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Locate peer-reviewed, credible sources</p>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Generate Content</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Create evidence-based documentation</p>
        </div>
        <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <RefreshCw className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Review & Iterate</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Continuous improvement until 100% accurate</p>
        </div>
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Release Content</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Verified, compliant documentation ready</p>
        </div>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Content Generation Parameters</CardTitle>
          <CardDescription>
            Specify your documentation requirements for AI-powered generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Documentation Topic
            </label>
            <input
              type="text"
              value={request.topic}
              onChange={(e) => setRequest(prev => ({ ...prev, topic: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., API Security Best Practices, Medical Device Quality Management"
            />
          </div>

          {/* Industry Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Industry
            </label>
            <select
              value={request.industry}
              onChange={(e) => setRequest(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Document Type
            </label>
            <select
              value={request.documentType}
              onChange={(e) => setRequest(prev => ({ ...prev, documentType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Specific Requirements
            </label>
            {request.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Include code examples, Follow WCAG 2.1 guidelines"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addRequirement}
            >
              Add Requirement
            </Button>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !request.topic.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Verified Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Success Header */}
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Content Generated Successfully!</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Achieved {(result.finalAccuracy * 100).toFixed(1)}% accuracy after {result.totalIterations} iterations
              </p>
            </CardContent>
          </Card>

          {/* Compliance Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compliance Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(result.complianceChecks).map(([check, passed]) => (
                  <div key={check} className="flex items-center gap-2">
                    {passed ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className="text-sm capitalize">
                      {check.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge variant={passed ? "default" : "destructive"} className="ml-auto">
                      {passed ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verified Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Peer-Reviewed Sources ({result.verifiedSources.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.verifiedSources.map((source, index) => (
                  <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {source.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {source.authors.join(', ')} • {source.journal} ({source.year})
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {source.summary}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        Relevance: {(source.relevanceScore * 100).toFixed(0)}%
                      </Badge>
                      <Badge variant="outline">
                        Credibility: {(source.credibilityScore * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Generated Content
              </CardTitle>
              <CardDescription>
                100% verified and compliant documentation ready for use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white overflow-x-auto">
                  {result.finalContent}
                </pre>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(result.finalContent)}
                >
                  Copy Content
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([result.finalContent], { type: 'text/markdown' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${request.topic.replace(/\s+/g, '-').toLowerCase()}.md`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  Download as Markdown
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
