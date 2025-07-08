'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Shield, Eye, Database, Lock, Globe, Mail, UserCheck, Settings, FileCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/legal/privacy" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-green-600" />
                1. Information We Collect
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or contact us</li>
                  <li>Use our services or client portal</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Upload documents or files</li>
                  <li>Communicate with us via email, phone, or chat</li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Types of Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, company information</li>
                  <li><strong>Account Information:</strong> Username, password, preferences, and settings</li>
                  <li><strong>Project Information:</strong> Documents, requirements, and communications related to your projects</li>
                  <li><strong>Usage Information:</strong> How you interact with our website and services</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and log data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-green-600" />
                2. How We Use Your Information
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Personalize and improve your experience</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-green-600" />
                3. Information Sharing and Disclosure
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">We may share information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                  <li><strong>Service providers:</strong> Third-party vendors who assist in our operations (hosting, payment processing, analytics)</li>
                  <li><strong>Legal requirements:</strong> When required by law, regulation, or court order</li>
                  <li><strong>Business transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
                  <li><strong>Safety and security:</strong> To protect our rights, property, or safety and that of our users</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Our Commitment:</h4>
                  <p className="text-green-700 dark:text-green-300">We never sell your personal information to advertisers or marketers. Your project data remains confidential and is only used to provide our services to you.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-green-600" />
                4. Data Security
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We implement appropriate technical and organizational measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
                  <li><strong>Access controls:</strong> Strict limits on who can access your information</li>
                  <li><strong>Regular security audits:</strong> Ongoing assessment of our security practices</li>
                  <li><strong>Secure infrastructure:</strong> Industry-standard hosting and security protocols</li>
                  <li><strong>Employee training:</strong> Staff trained on privacy and security best practices</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Security Incident Response:</h4>
                  <p className="text-blue-700 dark:text-blue-300">In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate steps to secure the affected systems.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 mr-2 text-green-600" />
                5. Your Rights and Choices
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Access and Control:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your information</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Communication Preferences:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Unsubscribe from marketing emails via the link in any email</li>
                  <li>Adjust notification settings in your account dashboard</li>
                  <li>Contact us to update your communication preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileCheck className="w-6 h-6 mr-2 text-green-600" />
                6. Data Retention
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We retain your information for as long as necessary to provide our services and fulfill legal obligations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account information:</strong> Retained while your account is active</li>
                  <li><strong>Project data:</strong> Retained for 7 years after project completion for warranty and legal purposes</li>
                  <li><strong>Communication records:</strong> Retained for 3 years for customer service purposes</li>
                  <li><strong>Usage data:</strong> Aggregated data may be retained indefinitely for analytics</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Cookies and Tracking
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Provide secure authentication</li>
                  <li>Analyze website usage and performance</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings. For more details, see our 
                  <a href="/legal/cookies" className="text-green-600 hover:text-green-700 font-medium"> Cookie Policy</a>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Third-Party Services
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Our website and services may integrate with third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Payment processing:</strong> Stripe (for secure payment handling)</li>
                  <li><strong>Analytics:</strong> Privacy-focused analytics tools</li>
                  <li><strong>Customer support:</strong> Support ticket systems</li>
                  <li><strong>Communication:</strong> Email and messaging services</li>
                </ul>
                <p className="mt-4">These services have their own privacy policies and we encourage you to review them.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-green-600" />
                9. International Data Transfers
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Standard contractual clauses</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Strong technical and organizational security measures</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our services are not directed to children under 13 (or 16 in the EU). We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will take steps to delete such information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-green-600" />
                Contact Us
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <p><strong>Email:</strong> <a href="mailto:hello@prismwriting.com" className="text-green-600 hover:text-green-700">hello@prismwriting.com</a></p>
                <p><strong>Subject Line:</strong> "Privacy Policy Inquiry"</p>
                <p><strong>Website:</strong> <a href="https://prismwriting.com" className="text-green-600 hover:text-green-700">prismwriting.com</a></p>
              </div>
            </section>

          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <a 
              href="/legal/cookies"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Cookie Policy
            </a>
            <a 
              href="/legal/terms"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Terms of Service →
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
