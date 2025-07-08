import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, Clock } from "lucide-react"
import { Navigation } from '@/components/navigation'

const portfolioItems = [
  // Aviation Documentation
  {
    id: 1,
    title: "Aircraft Maintenance Manual",
    category: "Aviation",
    description: "Comprehensive maintenance documentation for commercial aircraft fleet, ensuring FAA compliance.",
    tags: ["Aviation", "Maintenance", "FAA", "Compliance"],
    readTime: "15 min read",
    isPublic: true
  },
  {
    id: 2,
    title: "Flight Operations Procedures",
    category: "Aviation",
    description: "Standard operating procedures for flight crews, including emergency protocols and safety guidelines.",
    tags: ["Flight Ops", "Safety", "Procedures"],
    readTime: "12 min read",
    isPublic: false
  },
  
  // Compliance Documentation
  {
    id: 3,
    title: "GDPR Compliance Manual",
    category: "Compliance",
    description: "Complete data protection compliance guide for multinational corporation.",
    tags: ["GDPR", "Data Protection", "Legal"],
    readTime: "20 min read",
    isPublic: true
  },
  {
    id: 4,
    title: "SOX Internal Controls",
    category: "Compliance",
    description: "Sarbanes-Oxley compliance documentation for financial reporting controls.",
    tags: ["SOX", "Financial", "Controls"],
    readTime: "18 min read",
    isPublic: false
  },
  
  // Technical Writing
  {
    id: 5,
    title: "API Integration Guide",
    category: "Technical",
    description: "Developer documentation for REST API integration with code examples and troubleshooting.",
    tags: ["API", "Developer", "Integration"],
    readTime: "10 min read",
    isPublic: true
  },
  {
    id: 6,
    title: "Software Architecture Documentation",
    category: "Technical",
    description: "Enterprise software architecture documentation with system diagrams and specifications.",
    tags: ["Architecture", "Software", "Enterprise"],
    readTime: "25 min read",
    isPublic: false
  },
  
  // Quality Assurance
  {
    id: 7,
    title: "QA Testing Procedures",
    category: "Quality",
    description: "Comprehensive quality assurance testing procedures for software development lifecycle.",
    tags: ["QA", "Testing", "SDLC"],
    readTime: "14 min read",
    isPublic: true
  },
  {
    id: 8,
    title: "ISO 9001 Quality Manual",
    category: "Quality",
    description: "ISO 9001 quality management system documentation for manufacturing company.",
    tags: ["ISO 9001", "Quality Management", "Manufacturing"],
    readTime: "30 min read",
    isPublic: false
  }
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/portfolio" />
      
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

        {/* Aviation Documentation Section */}
        <section id="aviation" className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Aviation Documentation
            </h2>
            <span className="ml-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {portfolioItems.filter(item => item.category === 'Aviation').length} Projects
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.filter(item => item.category === 'Aviation').map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  {item.isPublic ? (
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      Confidential
                    </span>
                  )}
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
                
                {item.isPublic ? (
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Sample
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Documentation Section */}
        <section id="compliance" className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Compliance Documentation
            </h2>
            <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {portfolioItems.filter(item => item.category === 'Compliance').length} Projects
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.filter(item => item.category === 'Compliance').map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  {item.isPublic ? (
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      Confidential
                    </span>
                  )}
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
                
                {item.isPublic ? (
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    View Sample
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Technical Writing Section */}
        <section id="technical" className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Technical Writing
            </h2>
            <span className="ml-3 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {portfolioItems.filter(item => item.category === 'Technical').length} Projects
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.filter(item => item.category === 'Technical').map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  {item.isPublic ? (
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      Confidential
                    </span>
                  )}
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
                
                {item.isPublic ? (
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    View Sample
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section id="quality" className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Quality Assurance
            </h2>
            <span className="ml-3 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {portfolioItems.filter(item => item.category === 'Quality').length} Projects
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.filter(item => item.category === 'Quality').map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  {item.isPublic ? (
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      Confidential
                    </span>
                  )}
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
                
                {item.isPublic ? (
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    View Sample
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </section>

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
