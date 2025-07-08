'use client'

import { Navigation } from '@/components/navigation'
import { FileText, Code, BookOpen, Settings, Users, Shield } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Comprehensive technical writing solutions designed to meet your specific documentation needs and improve user experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="aviation" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* API Documentation */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  API Documentation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive API documentation that enables developers to integrate and use your services effectively.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                  RESTful API documentation with clear endpoint descriptions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                  Interactive examples and code samples
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                  Authentication and error handling guides
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                  SDK and library documentation
                </li>
              </ul>
            </div>

            {/* User Guides */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  User Guides & Manuals
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Step-by-step user guides that transform complex processes into easy-to-follow instructions.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-3"></div>
                  Getting started guides and onboarding flows
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-3"></div>
                  Feature tutorials with screenshots and visuals
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-3"></div>
                  Troubleshooting and FAQ sections
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-3"></div>
                  Video tutorials and interactive guides
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Second Row */}
      <section id="compliance" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Technical Writing */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Technical Writing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Professional technical writing services that communicate complex information clearly and effectively.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                  Software documentation and specifications
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                  Process documentation and procedures
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                  Training materials and knowledge bases
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                  White papers and technical reports
                </li>
              </ul>
            </div>

            {/* Process Documentation */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Process Documentation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Standardized process documentation that ensures consistency and quality across your organization.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mr-3"></div>
                  Standard Operating Procedures (SOPs)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mr-3"></div>
                  Workflow documentation and diagrams
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mr-3"></div>
                  Quality assurance procedures
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mr-3"></div>
                  Compliance and regulatory documentation
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Third Row */}
      <section id="technical" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Training & Support */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Training & Support
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive training programs and ongoing support to ensure successful adoption of your documentation.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3"></div>
                  Documentation workshops and training sessions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3"></div>
                  Content strategy and planning consultation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3"></div>
                  Ongoing maintenance and updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3"></div>
                  Documentation audits and improvements
                </li>
              </ul>
            </div>

            {/* Quality Assurance */}
            <div id="quality" className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Quality Assurance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Rigorous quality assurance processes to ensure accuracy, consistency, and effectiveness of all documentation.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-3"></div>
                  Multi-level review and editing processes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-3"></div>
                  Technical accuracy verification
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-3"></div>
                  Usability testing and feedback integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-3"></div>
                  Version control and change management
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Improve Your Documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your technical writing needs and discover how we can help you communicate more effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
