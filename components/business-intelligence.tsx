'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

interface BusinessMetrics {
  totalRevenue: number
  monthlyRevenue: number
  totalLeads: number
  conversionRate: number
  averageProjectValue: number
  activeProjects: number
  clientRetentionRate: number
  monthlyGrowth: number
}

interface RevenueData {
  month: string
  revenue: number
  leads: number
  conversions: number
}

export function BusinessIntelligenceDashboard() {
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalLeads: 0,
    conversionRate: 0,
    averageProjectValue: 0,
    activeProjects: 0,
    clientRetentionRate: 0,
    monthlyGrowth: 0
  })

  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching business intelligence data
    // In a real application, this would come from your analytics API
    const fetchBusinessData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data - in production, this would come from your database
        setMetrics({
          totalRevenue: 125000,
          monthlyRevenue: 18500,
          totalLeads: 145,
          conversionRate: 28.5,
          averageProjectValue: 3500,
          activeProjects: 12,
          clientRetentionRate: 89,
          monthlyGrowth: 15.2
        })

        setRevenueData([
          { month: 'Jan', revenue: 12000, leads: 23, conversions: 6 },
          { month: 'Feb', revenue: 15000, leads: 28, conversions: 8 },
          { month: 'Mar', revenue: 18000, leads: 32, conversions: 9 },
          { month: 'Apr', revenue: 22000, leads: 35, conversions: 11 },
          { month: 'May', revenue: 18500, leads: 27, conversions: 7 },
          { month: 'Jun', revenue: 25000, leads: 42, conversions: 14 }
        ])
      } catch (error) {
        console.error('Error fetching business data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(metrics.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">
              +{formatPercentage(metrics.monthlyGrowth)} from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(metrics.monthlyRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-gray-600">
              Current month performance
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Target className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-purple-600 font-medium">
              {formatPercentage(metrics.conversionRate)} conversion rate
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Project Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(metrics.averageProjectValue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <PieChart className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-sm text-gray-600">
              Based on {metrics.activeProjects} active projects
            </span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="space-y-4">
          {revenueData.map((data) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">
                {data.month}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900">
                    {formatCurrency(data.revenue)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {data.leads} leads • {data.conversions} conversions
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((data.revenue / 25000) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Client Retention</h4>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatPercentage(metrics.clientRetentionRate)}
          </p>
          <p className="text-sm text-gray-500">Excellent retention rate</p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Active Projects</h4>
          <p className="text-3xl font-bold text-gray-900 mb-1">{metrics.activeProjects}</p>
          <p className="text-sm text-gray-500">Currently in progress</p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Growth Rate</h4>
          <p className="text-3xl font-bold text-green-600 mb-1">
            +{formatPercentage(metrics.monthlyGrowth)}
          </p>
          <p className="text-sm text-gray-500">Month over month</p>
        </div>
      </div>
    </div>
  )
}
