'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { 
  Shield, 
  FileText, 
  Download, 
  Users, 
  AlertTriangle,
  Search
} from 'lucide-react'

interface HebrewTranslation {
  id: string
  timestamp: string
  type: 'webpage' | 'document' | 'contract' | 'communication'
  originalText: string
  translatedText: string
  context: string
  clientName?: string
  conflictRelated: boolean
  sensitivity: 'public' | 'confidential' | 'restricted'
  status: 'pending' | 'reviewed' | 'approved' | 'archived'
}

interface Contract {
  id: string
  clientName: string
  contractType: string
  status: string
  createdAt: string
  hebrewTranslation?: { required: boolean; completed: boolean }
}

export default function SuperAdminDashboard() {
  const [translations, setTranslations] = useState<HebrewTranslation[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'translations' | 'contracts' | 'analytics'>('translations')
  const [searchTerm, setSearchTerm] = useState('')
  const [conflictFilter, setConflictFilter] = useState<'all' | 'conflict-only'>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load Hebrew translations
      const translationsResponse = await fetch('/api/hebrew-translations', {
        headers: { 'x-user-role': 'superadmin' }
      })
      if (translationsResponse.ok) {
        const translationsData = await translationsResponse.json()
        setTranslations(translationsData.translations || [])
      }

      // Load contracts
      const contractsResponse = await fetch('/api/contracts', {
        headers: { 'x-user-role': 'superadmin' }
      })
      if (contractsResponse.ok) {
        const contractsData = await contractsResponse.json()
        setContracts(contractsData.contracts || [])
      }

    } catch (error) {
      console.error('Error loading superadmin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportTranslations = async () => {
    try {
      const response = await fetch(`/api/hebrew-translations?format=csv&conflict=${conflictFilter === 'conflict-only'}`, {
        headers: { 'x-user-role': 'superadmin' }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `hebrew_translations_${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed')
    }
  }

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.translatedText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesConflict = conflictFilter === 'all' || 
                           (conflictFilter === 'conflict-only' && translation.conflictRelated)
    
    return matchesSearch && matchesConflict
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/superadmin" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  SuperAdmin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Hebrew Translation Archive & Contract Management
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-red-600" />
                <span className="text-sm font-medium text-red-600">Conflict Period Archive</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('translations')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'translations'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  Hebrew Translations ({filteredTranslations.length})
                </button>
                <button
                  onClick={() => setActiveTab('contracts')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'contracts'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  Contracts & NDAs ({contracts.length})
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  Analytics
                </button>
              </nav>
            </div>

            {/* Hebrew Translations Tab */}
            {activeTab === 'translations' && (
              <div className="p-6">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search translations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={conflictFilter}
                      onChange={(e) => setConflictFilter(e.target.value as 'all' | 'conflict-only')}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Translations</option>
                      <option value="conflict-only">Conflict-Related Only</option>
                    </select>
                    <button
                      onClick={exportTranslations}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Translations List */}
                <div className="space-y-4">
                  {filteredTranslations.map((translation) => (
                    <div key={translation.id} className="border dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            translation.conflictRelated ? 'bg-red-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              translation.type === 'contract' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : translation.type === 'document'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                              {translation.type}
                            </span>
                            {translation.clientName && (
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                {translation.clientName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            translation.sensitivity === 'restricted'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : translation.sensitivity === 'confidential'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {translation.sensitivity}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(translation.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Original</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            {translation.originalText.substring(0, 150)}...
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Translation</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            {translation.translatedText.substring(0, 150)}...
                          </p>
                        </div>
                      </div>
                      
                      {translation.context && (
                        <div className="mt-3">
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Context</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {translation.context}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {filteredTranslations.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No translations found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contracts Tab */}
            {activeTab === 'contracts' && (
              <div className="p-6">
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="border dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {contract.clientName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {contract.contractType} • Created {new Date(contract.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            contract.status === 'signed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {contract.status}
                          </span>
                          {contract.hebrewTranslation?.required && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Hebrew Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{translations.length}</p>
                        <p className="text-sm text-blue-600">Total Translations</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-red-600">
                          {translations.filter(t => t.conflictRelated).length}
                        </p>
                        <p className="text-sm text-red-600">Conflict-Related</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-green-600">{contracts.length}</p>
                        <p className="text-sm text-green-600">Active Contracts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
