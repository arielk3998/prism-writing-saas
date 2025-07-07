import Link from "next/link"
import { Users, FileText, BarChart3, Settings, ArrowLeft } from "lucide-react"

const stats = [
  {
    name: "Total Leads",
    value: "12",
    change: "+2 this week",
    changeType: "positive"
  },
  {
    name: "Active Projects",
    value: "5",
    change: "+1 this month",
    changeType: "positive"
  },
  {
    name: "Portfolio Items",
    value: "6",
    change: "No change",
    changeType: "neutral"
  },
  {
    name: "Newsletter Subscribers",
    value: "48",
    change: "+5 this week",
    changeType: "positive"
  }
]

const recentLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techstartup.com",
    project: "API Documentation",
    status: "new",
    date: "2025-01-06"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@consulting.com",
    project: "Business Proposal",
    status: "contacted",
    date: "2025-01-05"
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@nonprofit.org",
    project: "Grant Writing",
    status: "qualified",
    date: "2025-01-04"
  }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Prism Writing</span>
              </Link>
              <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your writing business with transparency and efficiency.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
                <Link 
                  href="/admin/leads"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{lead.project}</p>
                        <p className="text-xs text-gray-500">{lead.date}</p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/admin/leads"
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="font-medium text-gray-900">Manage Leads</span>
                  <span className="text-sm text-gray-600">View and respond</span>
                </Link>
                
                <Link
                  href="/admin/portfolio"
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-8 w-8 text-green-600 mb-2" />
                  <span className="font-medium text-gray-900">Portfolio</span>
                  <span className="text-sm text-gray-600">Add new work</span>
                </Link>
                
                <Link
                  href="/admin/analytics"
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="font-medium text-gray-900">Analytics</span>
                  <span className="text-sm text-gray-600">View insights</span>
                </Link>
                
                <Link
                  href="/admin/settings"
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="font-medium text-gray-900">Settings</span>
                  <span className="text-sm text-gray-600">Configure site</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Welcome to Your Transparent Business Dashboard
          </h3>
          <p className="text-gray-600 mb-4">
            This dashboard provides real-time insights into your writing business. 
            All statistics are accurate and updated automatically.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Real-time Data
            </span>
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Transparent Metrics
            </span>
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              Automated Workflows
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
