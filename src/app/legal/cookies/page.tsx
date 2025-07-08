'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Cookie, Settings, Shield, Eye, Globe, Mail } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPath="/legal/cookies" />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                <Cookie className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-orange-600" />
                What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies contain information that is transferred to your computer's hard drive and allow us to recognize your browser and capture certain information about your interactions with our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-orange-600" />
                How We Use Cookies
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We use cookies for the following purposes:</p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for the website to function properly and cannot be disabled:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                      <li>Authentication and session management</li>
                      <li>Security features and fraud prevention</li>
                      <li>Remembering your preferences and settings</li>
                      <li>Enabling core functionality like file uploads</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2">Functional Cookies</h3>
                    <p>These cookies enhance your experience by remembering your choices:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                      <li>Language and region preferences</li>
                      <li>Theme preferences (light/dark mode)</li>
                      <li>Form data to prevent data loss</li>
                      <li>Recently viewed content</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                    <p>These cookies help us understand how visitors interact with our website:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                      <li>Page views and user behavior patterns</li>
                      <li>Popular content and features</li>
                      <li>Website performance and error tracking</li>
                      <li>Traffic sources and user demographics</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                    <p>These cookies are used to deliver personalized content and advertisements:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                      <li>Personalized content recommendations</li>
                      <li>Conversion tracking for marketing campaigns</li>
                      <li>Social media integration</li>
                      <li>Newsletter subscription preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Types of Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Cookie Name</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Purpose</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">session_token</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">User authentication</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Session</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">theme_preference</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Remember theme setting</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1 year</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Functional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">analytics_id</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Website analytics</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2 years</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">marketing_consent</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Marketing preferences</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1 year</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Cookies
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>Some cookies on our website are set by third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Stripe:</strong> For secure payment processing (essential for transactions)</li>
                  <li><strong>Analytics providers:</strong> For website performance monitoring</li>
                  <li><strong>Social media platforms:</strong> For social sharing functionality</li>
                  <li><strong>Content delivery networks:</strong> For improved website performance</li>
                </ul>
                <p className="mt-4">
                  These third parties have their own privacy policies governing their use of cookies. We recommend reviewing their policies for more information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-orange-600" />
                Managing Your Cookie Preferences
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>You have several options for managing cookies:</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Browser Settings</h3>
                <p>Most browsers allow you to control cookies through their settings:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Cookie Consent Banner</h3>
                <p>When you first visit our website, you'll see a cookie consent banner where you can:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accept all cookies</li>
                  <li>Accept only essential cookies</li>
                  <li>Customize your preferences by cookie type</li>
                  <li>Learn more about each type of cookie</li>
                </ul>

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Important Note:</h4>
                  <p className="text-orange-700 dark:text-orange-300">Disabling certain cookies may limit your ability to use some features of our website, such as staying logged in or receiving personalized content.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cookie Consent Withdrawal
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>You can withdraw your consent to cookies at any time by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Clicking the "Cookie Settings" link in the footer</li>
                  <li>Clearing your browser cookies</li>
                  <li>Contacting us directly at hello@prismwriting.com</li>
                  <li>Using your browser's privacy settings</li>
                </ul>
                <p className="mt-4">
                  Note that withdrawing consent will not affect the lawfulness of processing based on consent before its withdrawal.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-orange-600" />
                International Users
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>We comply with international cookie laws and regulations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>GDPR (EU):</strong> We obtain explicit consent before using non-essential cookies</li>
                  <li><strong>ePrivacy Directive:</strong> We provide clear information about cookie usage</li>
                  <li><strong>CCPA (California):</strong> We respect your right to opt-out of certain tracking</li>
                  <li><strong>PIPEDA (Canada):</strong> We follow privacy principles for cookie usage</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Updates to This Cookie Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any significant changes by posting a notice on our website or by other appropriate means.
              </p>
            </section>

            <section className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-orange-600" />
                Contact Us
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-2">
                <p>If you have any questions about our use of cookies, please contact us:</p>
                <p><strong>Email:</strong> <a href="mailto:hello@prismwriting.com" className="text-orange-600 hover:text-orange-700">hello@prismwriting.com</a></p>
                <p><strong>Subject Line:</strong> "Cookie Policy Inquiry"</p>
                <p><strong>Website:</strong> <a href="https://prismwriting.com" className="text-orange-600 hover:text-orange-700">prismwriting.com</a></p>
              </div>
            </section>

          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <a 
              href="/legal/terms"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Terms of Service
            </a>
            <a 
              href="/legal/privacy"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Privacy Policy →
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
