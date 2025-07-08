'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CustomerAuth } from '@/components/customer-auth'
import { Navigation } from '@/components/navigation'
import { 
  Calendar, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  AlertCircle,
  Download
} from 'lucide-react'

interface Project {
  id: string
  title: string
  status: string
  dueDate: string | null
  completedAt: string | null
  progress: number
  milestones: Array<{
    id: string
    title: string
    isCompleted: boolean
    dueDate: string | null
  }>
}

interface Document {
  id: string
  title: string
  type: string
  size: number
  uploadedAt: string
  url: string
  description?: string
}

interface Communication {
  id: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
  sender: {
    name: string | null
  }
}

interface Customer {
  id: string
  email: string
  name: string | null
}

export default function ClientPortalDashboard() {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [communications, setCommunications] = useState<Communication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get customer from session storage (set by CustomerAuth)
    const customerData = sessionStorage.getItem('customer')
    if (customerData) {
      const customer = JSON.parse(customerData)
      setCustomer(customer)
      fetchPortalData(customer.id)
    }
  }, [])

  const fetchPortalData = async (customerId: string) => {
    try {
      // Fetch documents using the customer documents API
      const docsRes = await fetch(`/api/customer/documents?customerId=${customerId}`)
      const docsData = await docsRes.json()
      
      // For now, map documents to projects format (since we have documents API but not separate projects API)
      if (docsData.success) {
        setDocuments(docsData.documents || [])
        
        // Create mock projects from documents for demo purposes
        const mockProjects = docsData.documents?.slice(0, 3).map((doc: Document, index: number) => ({
          id: doc.id,
          title: doc.title || `Project ${index + 1}`,
          status: ['COMPLETED', 'ACTIVE', 'PLANNING'][index % 3],
          dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: index === 0 ? new Date().toISOString() : null,
          progress: [100, 65, 25][index % 3],
          milestones: []
        })) || []
        
        setProjects(mockProjects)
        
        // Mock communications
        setCommunications([
          {
            id: '1',
            subject: 'Project Update Available',
            message: 'Your latest project deliverables are ready for review.',
            createdAt: new Date().toISOString(),
            isRead: false,
            sender: { name: 'Prism Writing Team' }
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching portal data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800'
      case 'ON_HOLD':
        return 'bg-yellow-100 text-yellow-800'
      case 'PLANNING':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <CustomerAuth>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation currentPath="/client" />
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back{customer?.name ? `, ${customer.name}` : ''}! Here's your project overview.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {projects.filter(p => p.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {documents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {communications.filter(c => !c.isRead).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {projects.length > 0 
                    ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Projects</h3>
            </div>
            <div className="p-6">
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by contacting us for a new project.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="border dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
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
                  {projects.length > 3 && (
                    <Link
                      href="/client/projects"
                      className="block text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View all projects →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Documents</h3>
            </div>
            <div className="p-6">
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No documents yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Documents will appear here when they're uploaded.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.slice(0, 5).map((document) => (
                    <div key={document.id} className="flex items-center justify-between border dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{document.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {document.type} • {(document.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(document.url, '_blank')}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                  {documents.length > 5 && (
                    <Link
                      href="/client/documents"
                      className="block text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View all documents →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Communications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Messages</h3>
            </div>
            <div className="p-6">
              {communications.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Messages from your project team will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {communications.slice(0, 3).map((comm) => (
                    <div key={comm.id} className={`border rounded-lg p-4 ${!comm.isRead ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'dark:border-gray-600'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{comm.subject}</h4>
                        {!comm.isRead && (
                          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{comm.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>From: {comm.sender.name || 'Prism Writing Team'}</span>
                        <span>{new Date(comm.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {communications.length > 3 && (
                    <Link
                      href="/client/messages"
                      className="block text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View all messages →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </CustomerAuth>
  )
}
