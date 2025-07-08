'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AIContentGenerator } from '@/components/ai-content-generator'

export default function AIContentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Content Generation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Generate industry-compliant documentation using peer-reviewed sources and iterative accuracy verification. 
              Our AI system ensures 100% accuracy through continuous review loops with credible academic sources.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🔬 Research-Driven AI Process
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Peer-reviewed source validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Iterative accuracy improvement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">100% accuracy guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Content Generator Component */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AIContentGenerator />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How Our AI Content Generation Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI system follows a rigorous process to ensure the highest quality, 
              most accurate documentation for your industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Source Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI searches academic databases, regulatory publications, and peer-reviewed journals 
                to find the most credible and relevant sources for your topic.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. Content Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Using verified sources, our AI generates comprehensive documentation that follows 
                industry standards and regulatory requirements specific to your sector.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Iterative Review
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Content undergoes multiple review cycles, checking for accuracy, compliance, 
                and completeness. Each iteration improves quality until 100% accuracy is achieved.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Verified Release
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only content that passes all accuracy and compliance checks is released. 
                You receive documentation with complete source attribution and verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Quality Assurance Standards
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📚 Source Verification
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Peer-reviewed journal articles only</li>
                <li>• Government regulatory publications</li>
                <li>• Industry standards organizations</li>
                <li>• Academic institution research</li>
                <li>• Expert-validated content</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Accuracy Metrics
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Factual accuracy verification</li>
                <li>• Regulatory compliance checking</li>
                <li>• Technical accuracy validation</li>
                <li>• Citation and reference verification</li>
                <li>• 100% accuracy threshold requirement</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔒 Compliance Assurance
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Industry-specific regulatory adherence</li>
                <li>• International standards compliance</li>
                <li>• Legal requirement verification</li>
                <li>• Quality management system alignment</li>
                <li>• Professional standards compliance</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔄 Continuous Improvement
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Multi-iteration review process</li>
                <li>• Expert feedback integration</li>
                <li>• Real-time accuracy monitoring</li>
                <li>• Automated compliance checking</li>
                <li>• Performance tracking and optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
