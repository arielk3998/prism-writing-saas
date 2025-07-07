'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  AlertCircle
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

export default function ClientPortalDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [communications, setCommunications] = useState<Communication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPortalData()
  }, [])

  const fetchPortalData = async () => {
    try {
      // Fetch projects
      const projectsRes = await fetch('/api/client/projects')
      const projectsData = await projectsRes.json()
      
      // Fetch communications
      const commsRes = await fetch('/api/client/communications')
      const commsData = await commsRes.json()
      
      setProjects(projectsData.projects || [])
      setCommunications(commsData.communications || [])
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
              <p className="text-gray-600">Welcome to your project dashboard</p>
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.filter(p => p.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.filter(p => p.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Messages</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {communications.filter(c => !c.isRead).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Progress</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.length > 0 
                    ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Your Projects</h3>
            </div>
            <div className="p-6">
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by contacting us for a new project.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{project.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {project.dueDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {new Date(project.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                  {projects.length > 3 && (
                    <Link
                      href="/client/projects"
                      className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View all projects →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Communications */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
            </div>
            <div className="p-6">
              {communications.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Messages from your project team will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {communications.slice(0, 3).map((comm) => (
                    <div key={comm.id} className={`border rounded-lg p-4 ${!comm.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{comm.subject}</h4>
                        {!comm.isRead && (
                          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{comm.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>From: {comm.sender.name || 'Prism Writing Team'}</span>
                        <span>{new Date(comm.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {communications.length > 3 && (
                    <Link
                      href="/client/messages"
                      className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
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
  )
}
