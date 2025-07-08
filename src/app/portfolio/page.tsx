'use client'

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const portfolioItems = [
  {
    id: 1,
    title: "MediTech Healthcare SOPs Sample",
    category: "Technical Documentation",
    description: "Professional Standard Operating Procedures sample for healthcare technology.",
    tags: ["Medical Device", "SOPs", "Healthcare", "Compliance"],
    readTime: "Sample Document",
    downloadUrl: "/downloads/MediTech_SOPs_Healthcare_Sample.pdf",
    isDownloadable: true
  },
  {
    id: 2,
    title: "PaymentPro API Documentation Sample",
    category: "API Documentation", 
    description: "Comprehensive API documentation sample showing endpoint specifications.",
    tags: ["API", "Developer", "Integration", "Payment"],
    readTime: "Sample Document",
    downloadUrl: "/downloads/PaymentPro_API_Documentation_Sample.pdf",
    isDownloadable: true
  },
  {
    id: 3,
    title: "SmartCity Installation Manual Sample", 
    category: "Technical Documentation",
    description: "Installation manual sample for smart city IoT systems.",
    tags: ["IoT", "Smart City", "Installation", "Manual"],
    readTime: "Sample Document",
    downloadUrl: "/downloads/SmartCity_Installation_Manual_Sample.pdf",
    isDownloadable: true
  }
]

export default function PortfolioPage() {
  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/portfolio" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio & Samples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Download free samples to see the quality of our work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
                <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => handleDownload(item.downloadUrl)}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Sample
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
