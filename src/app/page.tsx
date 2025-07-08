'use client'

// Force cache refresh - January 7, 2025 - 21:15 EST
import { Navigation } from '@/components/navigation'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users, FileText, BarChart3, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Navigation currentPath="/" />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">P</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Prism Writing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Professional Services
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional technical writing, documentation, and compliance services. 
              Specializing in aviation, healthcare, and regulatory documentation for modern businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive technical writing and documentation services tailored to your industry needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: 'Technical Writing',
                  description: 'Expert technical documentation, user manuals, API documentation, and software specifications that communicate complex information clearly.'
                },
                {
                  icon: Shield,
                  title: 'Compliance Documentation',
                  description: 'Regulatory compliance documents, policy manuals, and audit reports ensuring your business meets industry standards.'
                },
                {
                  icon: Users,
                  title: 'Business Content',
                  description: 'Professional business proposals, marketing copy, white papers, and strategic communications that drive results.'
                },
                {
                  icon: BarChart3,
                  title: 'Content Strategy',
                  description: 'Comprehensive content planning, information architecture, and editorial workflows to optimize your content ecosystem.'
                },
                {
                  icon: Zap,
                  title: 'Aviation Documentation',
                  description: 'Specialized aviation manuals, maintenance procedures, and FAA-compliant documentation for aerospace industry.'
                },
                {
                  icon: Clock,
                  title: 'Quick Turnaround',
                  description: 'Fast, reliable delivery with transparent timelines and regular updates throughout your project lifecycle.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get professional writing services that communicate clearly and drive results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center px-8 py-4 border border-white text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold">Prism Writing</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Professional technical writing and documentation services. 
                Specialized expertise for aviation, healthcare, and compliance industries.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/portfolio#aviation" className="hover:text-white transition-colors">Aviation Documentation</Link></li>
                <li><Link href="/portfolio#compliance" className="hover:text-white transition-colors">Compliance Documentation</Link></li>
                <li><Link href="/portfolio#technical" className="hover:text-white transition-colors">Technical Writing</Link></li>
                <li><Link href="/portfolio#quality" className="hover:text-white transition-colors">Quality Assurance</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/client" className="hover:text-white transition-colors">Client Portal</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Access</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Prism Writing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
