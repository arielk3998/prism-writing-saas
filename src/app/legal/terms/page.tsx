'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FileText, Shield, Users, Globe, Mail } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/legal/terms" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using Prism Writing's services, website, and client portal, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                These terms apply to all visitors, users, customers, and others who access or use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                2. Description of Service
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Prism Writing provides professional technical writing and documentation services, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Technical documentation and user guides</li>
                  <li>API documentation and developer resources</li>
                  <li>Compliance and regulatory documentation</li>
                  <li>Training materials and educational content</li>
                  <li>Content localization and translation services</li>
                  <li>Document conversion and formatting services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. User Accounts and Responsibilities
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Safeguarding your account password and login credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your account information remains current and accurate</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Intellectual Property Rights
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p><strong>Client Content:</strong> You retain all rights to content you provide to us. By engaging our services, you grant us a limited license to use your content solely for the purpose of providing our services.</p>
                <p><strong>Our Work Product:</strong> Upon full payment, you receive exclusive rights to the final deliverables we create for you. We retain rights to our methodologies, processes, and general knowledge.</p>
                <p><strong>Sample Work:</strong> Samples displayed in our portfolio are used with permission or are anonymized/fictionalized versions created for demonstration purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Payment Terms
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Payment terms are specified in individual project agreements. Generally:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>50% deposit required before work begins for new clients</li>
                  <li>Final payment due upon delivery of completed work</li>
                  <li>Late payments may incur fees as specified in project agreements</li>
                  <li>All payments are processed securely through Stripe</li>
                  <li>Refunds are handled according to our refund policy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Confidentiality and Data Protection
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We take your privacy seriously and maintain strict confidentiality regarding your business information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All client information is kept confidential and secure</li>
                  <li>We sign NDAs when requested by clients</li>
                  <li>Data is processed in accordance with our Privacy Policy</li>
                  <li>We comply with GDPR, CCPA, and other applicable privacy laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Service Level Agreements
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We strive to provide high-quality services within agreed timeframes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Project timelines are specified in individual agreements</li>
                  <li>We provide regular progress updates</li>
                  <li>Revisions are included as specified in project scope</li>
                  <li>Force majeure events may affect delivery timelines</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Limitation of Liability
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>To the maximum extent permitted by law:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our liability is limited to the amount paid for services</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>We provide services "as is" without warranties beyond those stated</li>
                  <li>Clients are responsible for final review and approval of all work</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Termination
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Either party may terminate the service relationship:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With 30 days written notice for ongoing services</li>
                  <li>Immediately for breach of terms or non-payment</li>
                  <li>Work completed prior to termination will be delivered upon payment</li>
                  <li>Confidentiality obligations survive termination</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-600" />
                10. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which Prism Writing operates, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms of Service.
              </p>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-blue-600" />
                Contact Information
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <p><strong>Email:</strong> <a href="mailto:hello@prismwriting.com" className="text-blue-600 hover:text-blue-700">hello@prismwriting.com</a></p>
                <p><strong>Website:</strong> <a href="https://prismwriting.com" className="text-blue-600 hover:text-blue-700">prismwriting.com</a></p>
              </div>
            </section>

          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <a 
              href="/legal/privacy"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Privacy Policy
            </a>
            <a 
              href="/legal/cookies"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cookie Policy →
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
