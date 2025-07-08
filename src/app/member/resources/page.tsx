'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { 
  Shield, 
  FileText, 
  Download, 
  Users, 
  Scale, 
  TrendingUp,
  Heart,
  Lock,
  DollarSign,
  Award
} from 'lucide-react'

interface InternalResource {
  id: string
  title: string
  description: string
  category: 'bylaws' | 'policies' | 'templates' | 'training' | 'financial'
  downloadUrl: string
  lastUpdated: string
  accessLevel: 'all_members' | 'admin_only' | 'super_admin_only'
  size: string
  format: string
}

const INTERNAL_RESOURCES: InternalResource[] = [
  {
    id: 'coop-bylaws',
    title: 'Prism Writing Cooperative Bylaws',
    description: 'Official governing bylaws based on successful cooperative structures, ensuring member happiness, longevity, and company prosperity.',
    category: 'bylaws',
    downloadUrl: '/downloads/internal/Prism_Writing_Cooperative_Bylaws_2025.pdf',
    lastUpdated: '2025-01-15',
    accessLevel: 'all_members',
    size: '1.2 MB',
    format: 'PDF'
  },
  {
    id: 'member-handbook',
    title: 'Member Handbook & Code of Conduct',
    description: 'Comprehensive guide for cooperative members including responsibilities, benefits, and operational procedures.',
    category: 'policies',
    downloadUrl: '/downloads/internal/Member_Handbook_2025.pdf',
    lastUpdated: '2025-01-10',
    accessLevel: 'all_members',
    size: '980 KB',
    format: 'PDF'
  },
  {
    id: 'profit-sharing',
    title: 'Profit Sharing & Compensation Structure',
    description: 'Detailed breakdown of our equitable profit-sharing model and compensation framework.',
    category: 'financial',
    downloadUrl: '/downloads/internal/Profit_Sharing_Structure_2025.pdf',
    lastUpdated: '2025-01-05',
    accessLevel: 'all_members',
    size: '745 KB',
    format: 'PDF'
  },
  {
    id: 'client-templates',
    title: 'Master Client Documentation Templates',
    description: 'Editable master templates for all client deliverables - Word, FrameMaker, and InDesign formats.',
    category: 'templates',
    downloadUrl: '/downloads/internal/Master_Client_Templates_Package.zip',
    lastUpdated: '2024-12-20',
    accessLevel: 'all_members',
    size: '15.3 MB',
    format: 'ZIP'
  },
  {
    id: 'quality-standards',
    title: 'Internal Quality Standards & Review Processes',
    description: 'Detailed quality assurance procedures and review checklists for maintaining our high standards.',
    category: 'policies',
    downloadUrl: '/downloads/internal/Quality_Standards_Internal_2025.pdf',
    lastUpdated: '2024-12-15',
    accessLevel: 'all_members',
    size: '1.1 MB',
    format: 'PDF'
  },
  {
    id: 'financial-reports',
    title: 'Quarterly Financial Reports & Projections',
    description: 'Transparent financial reporting including revenue, expenses, and growth projections.',
    category: 'financial',
    downloadUrl: '/downloads/internal/Q4_2024_Financial_Report.pdf',
    lastUpdated: '2025-01-01',
    accessLevel: 'admin_only',
    size: '2.1 MB',
    format: 'PDF'
  },
  {
    id: 'member-training',
    title: 'New Member Onboarding & Training Materials',
    description: 'Comprehensive training package for new cooperative members including tools, processes, and best practices.',
    category: 'training',
    downloadUrl: '/downloads/internal/Member_Training_Package_2025.zip',
    lastUpdated: '2024-11-30',
    accessLevel: 'admin_only',
    size: '25.7 MB',
    format: 'ZIP'
  },
  {
    id: 'governance-docs',
    title: 'Governance Documents & Legal Filings',
    description: 'Legal registration documents, ICA compliance, and cooperative certification materials.',
    category: 'bylaws',
    downloadUrl: '/downloads/internal/Governance_Legal_Documents_2025.zip',
    lastUpdated: '2025-01-20',
    accessLevel: 'super_admin_only',
    size: '5.4 MB',
    format: 'ZIP'
  }
]

interface MemberData {
  email: string
  role: 'super_admin' | 'admin_member'
  loginTime: string
  authVerified?: boolean
}

export default function InternalResourcesPage() {
  const [memberData, setMemberData] = useState<MemberData | null>(null)
  const [filteredResources, setFilteredResources] = useState(INTERNAL_RESOURCES)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Check member authentication
    const memberDataStr = sessionStorage.getItem('member_data')
    if (!memberDataStr) {
      window.location.href = '/member/login'
      return
    }
    
    const member = JSON.parse(memberDataStr)
    setMemberData(member)
    
    // Filter resources based on access level
    const accessibleResources = INTERNAL_RESOURCES.filter(resource => {
      if (member.role === 'super_admin') return true
      if (member.role === 'admin_member' && resource.accessLevel !== 'super_admin_only') return true
      return resource.accessLevel === 'all_members'
    })
    
    setFilteredResources(accessibleResources)
  }, [])

  useEffect(() => {
    let filtered = INTERNAL_RESOURCES.filter(resource => {
      // Access level filtering
      if (!memberData) return false
      if (memberData.role === 'super_admin') return true
      if (memberData.role === 'admin_member' && resource.accessLevel !== 'super_admin_only') return true
      return resource.accessLevel === 'all_members'
    })

    // Category filtering
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    setFilteredResources(filtered)
  }, [selectedCategory, memberData])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bylaws': return <Scale className="w-5 h-5" />
      case 'policies': return <Shield className="w-5 h-5" />
      case 'templates': return <FileText className="w-5 h-5" />
      case 'training': return <Users className="w-5 h-5" />
      case 'financial': return <DollarSign className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bylaws': return 'text-purple-600'
      case 'policies': return 'text-blue-600'
      case 'templates': return 'text-green-600'
      case 'training': return 'text-orange-600'
      case 'financial': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getAccessIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'all_members': return <Users className="w-4 h-4 text-green-500" />
      case 'admin_only': return <Shield className="w-4 h-4 text-blue-500" />
      case 'super_admin_only': return <Lock className="w-4 h-4 text-red-500" />
      default: return <Users className="w-4 h-4 text-green-500" />
    }
  }

  const handleDownload = (resource: InternalResource) => {
    // Log internal download for audit trail
    const downloadLog = {
      resourceId: resource.id,
      memberEmail: memberData?.email,
      memberRole: memberData?.role,
      timestamp: new Date().toISOString(),
      resourceTitle: resource.title
    }
    console.log('Internal resource downloaded:', downloadLog)
    
    // Open download
    window.open(resource.downloadUrl, '_blank')
  }

  if (!memberData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Member authentication required</p>
          <a
            href="/member/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Member Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Internal Member Resources
            </h1>
            <p className="text-xl text-purple-100 mb-4 max-w-3xl mx-auto">
              Exclusive resources for Prism Writing Cooperative members
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Welcome, {memberData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{memberData.role === 'super_admin' ? 'Super Admin' : 'Admin Member'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="bylaws">Bylaws & Governance</option>
              <option value="policies">Policies & Procedures</option>
              <option value="templates">Templates & Tools</option>
              <option value="training">Training & Development</option>
              <option value="financial">Financial & Reports</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredResources.length} resources available
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={getCategoryColor(resource.category)}>
                        {getCategoryIcon(resource.category)}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {resource.category}
                      </span>
                    </div>
                    {getAccessIcon(resource.accessLevel)}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {resource.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Format:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{resource.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Size:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{resource.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Updated:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(resource.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Access:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {resource.accessLevel.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleDownload(resource)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Resource
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filter or check back later</p>
            </div>
          )}
        </div>
      </section>

      {/* Cooperative Info */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Cooperative Structure
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Built on proven cooperative principles that prioritize member happiness, 
            company longevity, and shared prosperity.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-blue-100">
            <div>
              <Heart className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Member Happiness</h3>
              <p className="text-sm">Democratic decision-making and equitable profit sharing</p>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Company Prosperity</h3>
              <p className="text-sm">Sustainable growth through collaborative excellence</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Long-term Success</h3>
              <p className="text-sm">Built on time-tested cooperative frameworks</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
