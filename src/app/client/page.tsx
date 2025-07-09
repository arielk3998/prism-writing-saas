'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { 
  Calendar, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Download,
  Shield,
  LogOut,
  User,
  Upload,
  FolderOpen,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Edit3,
  Plus,
  Paperclip,
  Send,
  Bell,
  Settings
} from 'lucide-react'

interface WorkRequest {
  id: string
  title: string
  description: string
  type: 'Technical Writing' | 'Documentation Review' | 'Translation' | 'Compliance Check' | 'Custom'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'draft' | 'submitted' | 'in-progress' | 'review' | 'completed'
  submittedAt: string
  dueDate?: string
  assignedTo?: string
  estimatedHours?: number
  actualHours?: number
}

interface Project {
  id: string
  title: string
  status: string
  dueDate: string | null
  completedAt: string | null
  progress: number
  workRequests: string[]
}

interface Document {
  id: string
  title: string
  type: string
  size: number
  uploadedAt: string
  url: string
  description?: string
  scanStatus: 'pending' | 'scanning' | 'clean' | 'threat-detected' | 'quarantined'
  category: 'source' | 'deliverable' | 'reference' | 'template' | 'work-request'
  version?: string
  securityScanDetails?: {
    scanDate: string
    scanEngine: string
    threatsFound: number
    fileIntegrity: boolean
  }
}

interface Customer {
  id: string
  email: string
  name: string
  company?: string
  tier: 'basic' | 'professional' | 'enterprise'
}

export default function ClientPortalDashboard() {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing customer session
    const customerData = sessionStorage.getItem('customer_data')
    if (customerData) {
      setCustomer(JSON.parse(customerData))
      loadDemoData()
    }
    setIsLoading(false)
  }, [])

  const loadDemoData = () => {
    // Demo data for client portal
    setProjects([
      {
        id: '1',
        title: 'Technical Documentation Project',
        status: 'ACTIVE',
        dueDate: '2025-07-15',
        completedAt: null,
        progress: 75,
        workRequests: ['wr-1', 'wr-2']
      },
      {
        id: '2',
        title: 'Compliance Manual Update',
        status: 'COMPLETED',
        dueDate: '2025-06-30',
        completedAt: '2025-06-28',
        progress: 100,
        workRequests: ['wr-3']
      }
    ])

    setDocuments([
      {
        id: '1',
        title: 'API Documentation v2.0',
        type: 'PDF',
        size: 2048000,
        uploadedAt: '2025-07-01',
        url: '/downloads/PaymentPro_API_Documentation_Sample.pdf',
        description: 'Updated API documentation with new endpoints',
        scanStatus: 'clean',
        category: 'deliverable',
        version: '2.0',
        securityScanDetails: {
          scanDate: '2025-07-01T10:00:00Z',
          scanEngine: 'Prism Security Scanner v3.1',
          threatsFound: 0,
          fileIntegrity: true
        }
      },
      {
        id: '2',
        title: 'Installation Manual',
        type: 'PDF',
        size: 1536000,
        uploadedAt: '2025-06-25',
        url: '/downloads/SmartCity_Installation_Manual_Sample.pdf',
        description: 'Complete installation guide for SmartCity platform',
        scanStatus: 'clean',
        category: 'deliverable',
        version: '1.3',
        securityScanDetails: {
          scanDate: '2025-06-25T14:30:00Z',
          scanEngine: 'Prism Security Scanner v3.1',
          threatsFound: 0,
          fileIntegrity: true
        }
      }
    ])
  }

  const handleDemoLogin = () => {
    const demoCustomer = {
      id: 'demo-customer-1',
      email: 'demo@example.com',
      name: 'Demo Client',
      company: 'Demo Company Inc.',
      tier: 'professional' as const
    }
    setCustomer(demoCustomer)
    sessionStorage.setItem('customer_data', JSON.stringify(demoCustomer))
    sessionStorage.setItem('customer_authenticated', 'true')
    loadDemoData()
  }

  const handleSignOut = () => {
    setCustomer(null)
    setProjects([])
    setDocuments([])
    sessionStorage.removeItem('customer_data')
    sessionStorage.removeItem('customer_authenticated')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'PLANNING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/client" />
      
      {!customer ? (
        // Login/Demo Access Section
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Portal</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Access your project dashboard and documents
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleDemoLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Demo Access (No Login Required)</span>
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  For full client access, contact us for login credentials
                </p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Welcome back, {customer.name}! Here's your project overview.
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Projects</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{projects.filter(p => p.status === 'ACTIVE').length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Completed</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{projects.filter(p => p.status === 'COMPLETED').length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Documents</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{documents.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Messages</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">3</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Projects */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Projects</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        {project.dueDate && (
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {new Date(project.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Documents */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Documents</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{doc.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{doc.description}</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                              <span>{doc.type}</span>
                              <span>{formatFileSize(doc.size)}</span>
                              <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            download
                            className="ml-4 flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-sm">Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <Footer />
    </div>
  )
}
