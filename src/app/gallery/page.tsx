'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { 
  FileText, 
  Download,
  Eye,
  Lock,
  Unlock,
  Search,
  Grid,
  List,
  Star,
  FileIcon,
  Briefcase,
  Users,
  Shield
} from 'lucide-react'
import { TranslationTool } from '@/components/translation-tool'

interface GalleryItem {
  id: string
  title: string
  description: string
  category: 'service' | 'sample' | 'template'
  industry: string[]
  type: string
  accessibility: 'public' | 'registered' | 'premium' | 'internal'
  downloadUrl?: string
  previewUrl?: string
  tags: string[]
  featured: boolean
  createdAt: string
  size?: string
  format?: string
  pricing?: string
  timeline?: string
  features?: string[]
  rating?: number
  downloads?: number
  author?: string
  conversionFormats?: string[]
  watermarked?: boolean
  previewOnly?: boolean
}

const galleryItems: GalleryItem[] = [
  // Services
  {
    id: 'api-docs-service',
    title: 'API Documentation Services',
    description: 'Comprehensive API documentation that enables developers to integrate and use your services effectively with interactive examples and clear endpoint descriptions.',
    category: 'service',
    industry: ['technology'],
    type: 'API Documentation',
    accessibility: 'public',
    tags: ['API', 'Developer Tools', 'Integration', 'RESTful', 'OpenAPI'],
    featured: true,
    createdAt: '2025-01-01',
    pricing: 'Starting at $2,500',
    timeline: '2-4 weeks',
    rating: 4.9,
    downloads: 567,
    author: 'Ariel Karagodskiy',
    features: [
      'RESTful API documentation with clear endpoint descriptions',
      'Interactive examples and code samples',
      'Authentication and error handling guides',
      'SDK and library documentation',
      'OpenAPI/Swagger specifications'
    ]
  },
  {
    id: 'user-guides-service',
    title: 'User Guides & Manuals',
    description: 'Step-by-step user guides that transform complex processes into easy-to-follow instructions with visual aids and interactive elements.',
    category: 'service',
    industry: ['education'],
    type: 'User Documentation',
    accessibility: 'public',
    tags: ['User Guides', 'Tutorials', 'Onboarding', 'Training'],
    featured: true,
    createdAt: '2025-01-01',
    pricing: 'Starting at $1,800',
    timeline: '1-3 weeks',
    features: [
      'Getting started guides and onboarding flows',
      'Feature tutorials with screenshots and visuals',
      'Troubleshooting and FAQ sections',
      'Video tutorials and interactive guides',
      'Mobile-responsive documentation'
    ]
  },
  {
    id: 'compliance-service',
    title: 'Regulatory Compliance Documentation',
    description: 'Specialized compliance documentation for healthcare, finance, and other regulated industries with full regulatory alignment.',
    category: 'service',
    industry: ['healthcare', 'finance'],
    type: 'Compliance',
    accessibility: 'public',
    tags: ['Compliance', 'Regulatory', 'Healthcare', 'Finance', 'FDA'],
    featured: true,
    createdAt: '2025-01-01',
    pricing: 'Starting at $3,500',
    timeline: '3-6 weeks',
    features: [
      'FDA and medical device compliance documentation',
      'FINRA and banking regulatory requirements',
      'ISO standards and quality management systems',
      'Audit trails and validation documentation',
      'Risk management and CAPA processes'
    ]
  },
  
  // Protected Samples (Login Required with Anti-Theft Protection)
  {
    id: 'meditech-sops',
    title: 'MediTech Healthcare SOPs Sample',
    description: 'Professional Standard Operating Procedures sample for healthcare technology demonstrating our expertise in medical device documentation.',
    category: 'sample',
    industry: ['healthcare'],
    type: 'SOPs',
    accessibility: 'registered',
    downloadUrl: '/downloads/protected/MediTech_SOPs_Healthcare_Sample_Watermarked.pdf',
    previewUrl: '/downloads/previews/MediTech_SOPs_Preview.pdf',
    tags: ['Medical Device', 'SOPs', 'Healthcare', 'Compliance'],
    featured: true,
    createdAt: '2024-12-15',
    size: '2.4 MB',
    format: 'PDF',
    watermarked: true,
    previewOnly: false
  },
  {
    id: 'paymentpro-api',
    title: 'PaymentPro API Documentation Sample',
    description: 'Comprehensive API documentation sample showing endpoint specifications, authentication flows, and integration examples.',
    category: 'sample',
    industry: ['finance'],
    type: 'API Documentation',
    accessibility: 'registered',
    downloadUrl: '/downloads/protected/PaymentPro_API_Documentation_Sample_Watermarked.pdf',
    previewUrl: '/downloads/previews/PaymentPro_API_Preview.pdf',
    tags: ['API', 'Developer', 'Integration', 'Payment', 'Finance'],
    featured: true,
    createdAt: '2024-12-10',
    size: '1.8 MB',
    format: 'PDF',
    watermarked: true,
    previewOnly: false
  },
  {
    id: 'smartcity-manual',
    title: 'SmartCity Installation Manual Sample',
    description: 'Installation manual sample for smart city IoT systems with detailed technical specifications and troubleshooting guides.',
    category: 'sample',
    industry: ['technology'],
    type: 'Installation Manual',
    accessibility: 'registered',
    downloadUrl: '/downloads/protected/SmartCity_Installation_Manual_Sample_Watermarked.pdf',
    previewUrl: '/downloads/previews/SmartCity_Installation_Preview.pdf',
    tags: ['IoT', 'Smart City', 'Installation', 'Manual', 'Technology'],
    featured: true,
    createdAt: '2024-12-05',
    size: '3.2 MB',
    format: 'PDF',
    watermarked: true,
    previewOnly: false
  },

  // Internal Templates (Member Access Only)
  {
    id: 'software-docs-template',
    title: 'Software Documentation Template',
    description: 'Comprehensive template for software product documentation including installation guides, API docs, and troubleshooting sections.',
    category: 'template',
    industry: ['technology'],
    type: 'Software Documentation',
    accessibility: 'internal',
    downloadUrl: '/downloads/templates/Software_Documentation_Template.docx',
    tags: ['Software', 'Template', 'Documentation', 'API', 'Installation'],
    featured: false,
    createdAt: '2024-11-20',
    size: '2.1 MB',
    format: 'Word Document',
    conversionFormats: ['PDF', 'FrameMaker', 'Markdown', 'HTML', 'InDesign']
  },
  {
    id: 'compliance-template',
    title: 'Healthcare Compliance Template',
    description: 'FDA and medical device compliance documentation template with GxP standards, risk management, and CAPA processes.',
    category: 'template',
    industry: ['healthcare'],
    type: 'Compliance Documentation',
    accessibility: 'internal',
    downloadUrl: '/downloads/templates/Healthcare_Compliance_Template.docx',
    tags: ['Healthcare', 'Compliance', 'FDA', 'GxP', 'Template'],
    featured: false,
    createdAt: '2024-11-15',
    size: '1.8 MB',
    format: 'Word Document',
    conversionFormats: ['PDF', 'FrameMaker', 'Markdown', 'HTML', 'InDesign']
  },
  {
    id: 'financial-template',
    title: 'Financial Services Documentation',
    description: 'FINRA and banking compliance documentation template with regulatory framework, KYC procedures, and risk controls.',
    category: 'template',
    industry: ['finance'],
    type: 'Financial Compliance',
    accessibility: 'internal',
    downloadUrl: '/downloads/templates/Financial_Services_Documentation_Template.docx',
    tags: ['Finance', 'FINRA', 'Banking', 'Compliance', 'Template'],
    featured: false,
    createdAt: '2024-11-10',
    size: '1.9 MB',
    format: 'Word Document',
    conversionFormats: ['PDF', 'FrameMaker', 'Markdown', 'HTML', 'InDesign']
  },
  {
    id: 'api-template',
    title: 'API Documentation Template',
    description: 'Modern template for API documentation and developer guides with interactive examples.',
    category: 'template',
    industry: ['technology'],
    type: 'API Documentation',
    accessibility: 'internal',
    downloadUrl: '/downloads/templates/API_Documentation_Template.docx',
    tags: ['API', 'Developer', 'Integration', 'Template', 'Documentation'],
    featured: true,
    createdAt: '2024-11-25',
    size: '2.3 MB',
    format: 'Word Document',
    conversionFormats: ['PDF', 'FrameMaker', 'Markdown', 'HTML', 'Confluence']
  },
  {
    id: 'sop-template',
    title: 'Standard Operating Procedure Template',
    description: 'Comprehensive SOP template for all industries with quality controls and training guides.',
    category: 'template',
    industry: ['manufacturing', 'healthcare'],
    type: 'SOPs',
    accessibility: 'internal',
    downloadUrl: '/downloads/templates/Standard_Operating_Procedure_Template.docx',
    tags: ['SOP', 'Operations', 'Quality', 'Template', 'Training'],
    featured: false,
    createdAt: '2024-11-18',
    size: '1.7 MB',
    format: 'Word Document',
    conversionFormats: ['PDF', 'FrameMaker', 'Markdown', 'HTML', 'InDesign']
  }
]

export default function GalleryPage() {
  const [items] = useState<GalleryItem[]>(galleryItems)
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFeatured, setShowFeatured] = useState<boolean>(false)
  const [userAccess, setUserAccess] = useState<'public' | 'registered' | 'premium' | 'internal'>('public')

  useEffect(() => {
    // Check user authentication level
    const customerData = sessionStorage.getItem('customer_data')
    const memberData = sessionStorage.getItem('member_data')
    
    if (memberData) {
      // Internal member access
      setUserAccess('internal')
    } else if (customerData) {
      const customer = JSON.parse(customerData)
      setUserAccess(customer.tier === 'enterprise' ? 'premium' : 'registered')
    }
  }, [])

  useEffect(() => {
    let filtered = items

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(item => item.industry.includes(selectedIndustry))
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by featured
    if (showFeatured) {
      filtered = filtered.filter(item => item.featured)
    }

    setFilteredItems(filtered)
  }, [items, selectedCategory, selectedIndustry, searchTerm, showFeatured])

  const getAccessIcon = (accessibility: string) => {
    switch (accessibility) {
      case 'public':
        return <Unlock className="w-4 h-4 text-green-500" />
      case 'registered':
        return <Users className="w-4 h-4 text-blue-500" />
      case 'premium':
        return <Lock className="w-4 h-4 text-purple-500" />
      case 'internal':
        return <Shield className="w-4 h-4 text-red-500" />
      default:
        return <Unlock className="w-4 h-4 text-green-500" />
    }
  }

  const canAccessItem = (item: GalleryItem) => {
    const accessLevels = { public: 0, registered: 1, premium: 2, internal: 3 }
    return accessLevels[userAccess as keyof typeof accessLevels] >= accessLevels[item.accessibility as keyof typeof accessLevels]
  }

  const handleDownload = (item: GalleryItem, format?: string) => {
    if (!canAccessItem(item)) {
      alert('Please log in to access this content')
      return
    }
    
    // Enhanced security logging for samples
    if (item.category === 'sample') {
      const downloadLog = {
        itemId: item.id,
        userId: sessionStorage.getItem('customer_data') ? JSON.parse(sessionStorage.getItem('customer_data')!).email : 'anonymous',
        timestamp: new Date().toISOString(),
        format: format || item.format,
        ipAddress: 'tracked' // Would be implemented server-side
      }
      console.log('Sample download logged:', downloadLog)
      
      // Show security notice for samples
      if (item.watermarked) {
        alert('This sample contains watermarks and tracking. By downloading, you agree to our terms of use.')
      }
    }
    
    if (format && item.conversionFormats?.includes(format)) {
      // Handle format conversion
      const convertedUrl = item.downloadUrl?.replace(/\.[^/.]+$/, '') + '_converted.' + format.toLowerCase()
      window.open(convertedUrl, '_blank')
    } else if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank')
    }
  }

  const handlePreview = (item: GalleryItem) => {
    if (item.previewUrl) {
      window.open(item.previewUrl, '_blank')
    }
  }

  const handleQuote = (item: GalleryItem) => {
    // Redirect to contact page with service pre-selected
    const contactUrl = `/contact?service=${encodeURIComponent(item.title)}&type=${encodeURIComponent(item.type)}`
    window.location.href = contactUrl
  }

  const industries = ['all', ...Array.from(new Set(items.flatMap(item => item.industry)))]
  const categories = ['all', 'service', 'sample', 'template']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/gallery" />
      
      {/* Translation Tool */}
      <TranslationTool className="fixed bottom-4 right-4 z-40" />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Services & Portfolio Gallery
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive range of technical writing services, professional samples, 
            and downloadable templates. Access levels vary based on your account status.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Unlock className="w-4 h-4" />
              <span>Public Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Registered User Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Premium Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Internal Member Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, samples, templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFeatured}
                onChange={(e) => setShowFeatured(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Featured Only</span>
            </label>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredItems.length} items found
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {item.category === 'service' && <Briefcase className="w-5 h-5 text-blue-600" />}
                        {item.category === 'sample' && <FileText className="w-5 h-5 text-green-600" />}
                        {item.category === 'template' && <FileIcon className="w-5 h-5 text-purple-600" />}
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {getAccessIcon(item.accessibility)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Industry:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.industry}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                      </div>
                      {item.pricing && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Pricing:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{item.pricing}</span>
                        </div>
                      )}
                      {item.timeline && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Timeline:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{item.timeline}</span>
                        </div>
                      )}
                      {item.size && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Size:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{item.size}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {item.category === 'service' ? (
                        <button 
                          onClick={() => handleQuote(item)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Get Quote
                        </button>
                      ) : item.category === 'template' && item.conversionFormats ? (
                        <div className="flex-1 space-y-2">
                          <button
                            onClick={() => handleDownload(item)}
                            disabled={!canAccessItem(item)}
                            className={`w-full ${
                              canAccessItem(item)
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            } px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                          >
                            <Download className="w-4 h-4" />
                            {canAccessItem(item) ? `Download (${item.format})` : 'Member Access Only'}
                          </button>
                          {canAccessItem(item) && (
                            <select 
                              onChange={(e) => e.target.value && handleDownload(item, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                              defaultValue=""
                            >
                              <option value="" disabled>Convert to format...</option>
                              {item.conversionFormats.map(format => (
                                <option key={format} value={format}>{format}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownload(item)}
                          disabled={!canAccessItem(item)}
                          className={`flex-1 ${
                            canAccessItem(item)
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          } px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                        >
                          <Download className="w-4 h-4" />
                          {canAccessItem(item) ? 'Download' : 'Login Required'}
                          {item.watermarked && canAccessItem(item) && (
                            <Shield className="w-3 h-3 text-yellow-400" />
                          )}
                        </button>
                      )}
                      {item.previewUrl && (
                        <button 
                          onClick={() => handlePreview(item)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {item.category === 'service' && <Briefcase className="w-5 h-5 text-blue-600" />}
                        {item.category === 'sample' && <FileText className="w-5 h-5 text-green-600" />}
                        {item.category === 'template' && <FileIcon className="w-5 h-5 text-purple-600" />}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        {item.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {getAccessIcon(item.accessibility)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <span>Industry: {item.industry}</span>
                        <span>Type: {item.type}</span>
                        {item.pricing && <span className="text-green-600 dark:text-green-400">{item.pricing}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-6">
                      {item.category === 'service' ? (
                        <button 
                          onClick={() => handleQuote(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Get Quote
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDownload(item)}
                          disabled={!canAccessItem(item)}
                          className={`${
                            canAccessItem(item)
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          } px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                        >
                          <Download className="w-4 h-4" />
                          {canAccessItem(item) ? 'Download' : 'Login Required'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Something Custom?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team can create custom documentation solutions tailored to your specific industry and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Conversation
            </a>
            <a
              href="/client"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Access Client Portal
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
