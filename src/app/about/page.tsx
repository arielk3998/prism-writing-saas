'use client'

import { Navigation } from '@/components/navigation'
import { Users, Target, Award, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Prism Writing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            We're a technical writing cooperative dedicated to transforming complex technical concepts 
            into clear, accessible documentation that empowers users and drives adoption.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At Prism Writing, we believe that great documentation is the bridge between innovative technology 
                and successful user adoption. Our mission is to make complex technical information accessible, 
                actionable, and engaging for diverse audiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                As a cooperative, we bring together experienced technical writers who share a commitment to 
                excellence, collaboration, and continuous learning. This structure allows us to offer specialized 
                expertise while maintaining the agility and personal attention of a boutique firm.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Clarity
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Collaboration
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Quality
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Innovation
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Why Choose a Cooperative?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">Diverse Expertise:</strong> Access to writers with different industry backgrounds and specializations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">Collaborative Approach:</strong> Built-in peer review and knowledge sharing
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">Scalable Resources:</strong> Flexible team sizing based on project needs
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">Shared Values:</strong> Democratic decision-making and equitable practices
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine technical expertise with user-centered design principles to create documentation 
              that truly serves its intended audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                User-Centered
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We start by understanding your users' needs, goals, and contexts to create documentation that truly serves them.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Goal-Oriented
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every piece of documentation is designed with clear objectives and measurable outcomes in mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Quality-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rigorous review processes and quality standards ensure accuracy, consistency, and effectiveness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Innovation-Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We embrace new tools, techniques, and technologies to deliver cutting-edge documentation solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in open communication, clear processes, and honest feedback throughout 
                every project. Our clients always know what to expect and when.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Technology evolves rapidly, and so do we. We invest in ongoing education and stay 
                current with industry trends, tools, and best practices.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Inclusivity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We create documentation that is accessible to diverse audiences and reflect inclusive 
                language and design principles in everything we produce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our cooperative approach can help you create documentation that truly makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Conversation
            </a>
            <a
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
