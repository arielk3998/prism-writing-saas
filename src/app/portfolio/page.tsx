import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, Clock, Eye } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Technical API Documentation",
    category: "Technical Writing",
    description: "Comprehensive API documentation for a fintech startup, including integration guides and code examples.",
    tags: ["API", "Documentation", "FinTech"],
    readTime: "5 min read",
    isPublic: true
  },
  {
    id: 2,
    title: "SaaS Product Landing Page Copy",
    category: "Copywriting",
    description: "High-converting landing page copy that increased sign-ups by 40% for a B2B software company.",
    tags: ["Landing Page", "Conversion", "B2B"],
    readTime: "3 min read",
    isPublic: true
  },
  {
    id: 3,
    title: "Employee Handbook Revision",
    category: "Business Writing",
    description: "Complete overhaul of employee handbook with clear policies and modern language for remote work.",
    tags: ["HR", "Policies", "Remote Work"],
    readTime: "10 min read",
    isPublic: false
  },
  {
    id: 4,
    title: "Grant Proposal - Non-Profit",
    category: "Proposal Writing",
    description: "Successfully secured $50K grant funding with compelling narrative and data-driven approach.",
    tags: ["Grant Writing", "Non-Profit", "Funding"],
    readTime: "8 min read",
    isPublic: false
  },
  {
    id: 5,
    title: "User Guide - Mobile App",
    category: "Technical Writing",
    description: "User-friendly mobile app guide with screenshots and step-by-step instructions.",
    tags: ["User Guide", "Mobile", "UX Writing"],
    readTime: "6 min read",
    isPublic: true
  },
  {
    id: 6,
    title: "Content Marketing Strategy",
    category: "Content Strategy",
    description: "12-month content calendar and strategy that doubled organic traffic for e-commerce client.",
    tags: ["Strategy", "SEO", "E-commerce"],
    readTime: "15 min read",
    isPublic: false
  }
]

export default function PortfolioPage() {
  const publicItems = portfolioItems.filter(item => item.isPublic)
  const privateItems = portfolioItems.filter(item => !item.isPublic)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Prism Writing</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/portfolio" className="text-blue-600 font-semibold">
                Portfolio
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link 
                href="/admin" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real projects, honest results. Here's a selection of our work across 
            different industries and content types.
          </p>
        </div>

        {/* Public Samples Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Eye className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Public Samples
            </h2>
            <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {publicItems.length} Available
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.readTime}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Sample
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Private Portfolio Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Client Work Highlights
            </h2>
            <span className="ml-3 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {privateItems.length} Projects
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-400">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    Confidential
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.readTime}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Add Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's create exceptional content that showcases your expertise and drives results.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}
