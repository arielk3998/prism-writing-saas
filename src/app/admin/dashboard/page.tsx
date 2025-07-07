'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Users, 
  FileText, 
  BarChart3, 
  ArrowLeft, 
  TrendingUp, 
  Mail, 
  Clock,
  Star,
  AlertCircle
} from "lucide-react"

interface DashboardData {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  convertedLeads: number
  conversionRate: number
  leadsBySource: { source: string; count: number }[]
  leadsByStatus: { status: string; count: number }[]
  recentActivity: Array<{
    id: string
    name: string | null
    email: string
    company: string | null
    status: string
    createdAt: string
    source: string
  }>
  monthlyTrends: { month: string; leads: number; conversions: number }[]
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/analytics?type=dashboard')
      const result = await response.json()
      
      if (result.success) {
        setDashboardData(result.data)
      } else {
        setError(result.message || 'Failed to load dashboard data')
      }
    } catch (err) {
      setError('Failed to connect to analytics service')
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const formatStatusName = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const formatSourceName = (source: string) => {
    return source.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800'
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800'
      case 'QUALIFIED': return 'bg-purple-100 text-purple-800'
      case 'CONVERTED': return 'bg-green-100 text-green-800'
      case 'LOST': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Website
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Refresh Data
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {dashboardData && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.totalLeads}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">All time</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Leads</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.newLeads}</p>
                  </div>
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Awaiting contact</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.conversionRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {dashboardData.convertedLeads} of {dashboardData.totalLeads} converted
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Leads</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.contactedLeads}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">In progress</p>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Lead Sources */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
                <div className="space-y-3">
                  {dashboardData.leadsBySource.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {formatSourceName(source.source)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(source.count / dashboardData.totalLeads) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{source.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Status */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Status</h3>
                <div className="space-y-3">
                  {dashboardData.leadsByStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {formatStatusName(status.status)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ 
                              width: `${(status.count / dashboardData.totalLeads) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{status.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <Link 
                    href="/admin/leads"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View All Leads →
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {dashboardData.recentActivity.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {lead.name || 'Anonymous'}
                        </h4>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        {lead.company && (
                          <p className="text-sm text-gray-500">{lead.company}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {formatStatusName(lead.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/admin/leads" 
            className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Leads</h3>
              <p className="text-sm text-gray-600">View and respond to inquiries</p>
            </div>
          </Link>

          <Link 
            href="/portfolio" 
            className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <FileText className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
              <p className="text-sm text-gray-600">Manage work samples</p>
            </div>
          </Link>

          <div className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <BarChart3 className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Business insights (Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
