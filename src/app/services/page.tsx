'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FileText, Code, BookOpen, Settings, Users, Shield, CheckCircle } from 'lucide-react'

const serviceCategories = [
  {
    id: 'api-docs',
    title: 'API Documentation',
    description: 'Comprehensive API documentation that enables developers to integrate and use your services effectively.',
    icon: Code,
    color: 'blue',
    features: [
      'RESTful API documentation with clear endpoint descriptions',
      'Interactive examples and code samples',
      'Authentication and error handling guides',
      'SDK and library documentation',
      'OpenAPI/Swagger specifications'
    ],
    pricing: 'Starting at $2,500',
    timeline: '2-4 weeks'
  },
  {
    id: 'user-guides',
    title: 'User Guides & Manuals',
    description: 'Step-by-step user guides that transform complex processes into easy-to-follow instructions.',
    icon: BookOpen,
    color: 'green',
    features: [
      'Getting started guides and onboarding flows',
      'Feature tutorials with screenshots and visuals',
      'Troubleshooting and FAQ sections',
      'Video tutorials and interactive guides',
      'Mobile-responsive documentation'
    ],
    pricing: 'Starting at $1,800',
    timeline: '1-3 weeks'
  },
  {
    id: 'technical-writing',
    title: 'Technical Writing',
    description: 'Professional technical writing services for complex software, engineering, and scientific documentation.',
    icon: FileText,
    color: 'purple',
    features: [
      'Architecture and design documentation',
      'Technical specifications and requirements',
      'System integration guides',
      'Developer onboarding documentation',
      'Technical blog posts and articles'
    ],
    pricing: 'Starting at $3,000',
    timeline: '2-6 weeks'
  },
  {
    id: 'process-docs',
    title: 'Process Documentation',
    description: 'Streamline your operations with clear, actionable process documentation and standard operating procedures.',
    icon: Settings,
    color: 'amber',
    features: [
      'Standard Operating Procedures (SOPs)',
      'Workflow diagrams and process maps',
      'Training and onboarding materials',
      'Quality assurance procedures',
      'Compliance documentation'
    ],
    pricing: 'Starting at $2,200',
    timeline: '2-4 weeks'
  },
  {
    id: 'compliance',
    title: 'Compliance Documentation',
    description: 'Ensure regulatory compliance with professionally written documentation that meets industry standards.',
    icon: Shield,
    color: 'red',
    features: [
      'Regulatory compliance documentation',
      'Safety protocols and procedures',
      'Risk assessment documentation',
      'Audit preparation materials',
      'Policy and procedure manuals'
    ],
    pricing: 'Starting at $4,000',
    timeline: '3-8 weeks'
  },
  {
    id: 'training',
    title: 'Training Materials',
    description: 'Comprehensive training materials that accelerate learning and improve knowledge retention.',
    icon: Users,
    color: 'teal',
    features: [
      'Interactive training modules',
      'E-learning content development',
      'Workshop and seminar materials',
      'Knowledge base articles',
      'Assessment and evaluation tools'
    ],
    pricing: 'Starting at $3,500',
    timeline: '3-6 weeks'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional <span className="text-blue-600 dark:text-blue-400">Writing Services</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Transform complex information into clear, actionable documentation that drives results and improves user experience.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional writing services tailored to your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {category.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{category.pricing}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{category.timeline}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a proven methodology to ensure consistent, high-quality results for every project.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We start by understanding your goals, audience, and technical requirements through detailed consultation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We create a detailed project plan with timelines, deliverables, and milestones tailored to your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Creation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team creates your documentation using industry best practices and collaborative review processes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deliver polished documentation with ongoing support and maintenance options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our track record speaks for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Projects Completed</div>
              <div className="text-gray-600 dark:text-gray-300">Across diverse industries and technologies</div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Client Satisfaction</div>
              <div className="text-gray-600 dark:text-gray-300">Based on post-project surveys and feedback</div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24h</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Response Time</div>
              <div className="text-gray-600 dark:text-gray-300">Average initial response to new inquiries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Transform your technical information into clear, actionable documentation that drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Quote
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

      <Footer />
    </div>
  )
}
