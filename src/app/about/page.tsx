'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
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

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our cooperative brings together experienced writers with diverse backgrounds in technology, 
              business, and communication to deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 - Lead Technical Writer (Ariel) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Ariel Karagodskiy
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                Founder & Lead Technical Writer
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                15+ years experience in API documentation, developer tools, and enterprise software. 
                Previously led documentation teams at Fortune 500 tech companies. Expert in technical 
                writing, content strategy, and documentation systems across multiple industries.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  API Documentation
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  DevTools
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                  Team Leadership
                </span>
                <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs">
                  Content Strategy
                </span>
                <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-xs">
                  Enterprise Solutions
                </span>
              </div>
            </div>

            {/* Team Member 2 - Healthcare & Compliance Specialist (Merla) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Merla Rodriguez
              </h3>
              <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                Healthcare & Compliance Documentation Specialist
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                12+ years in medical device documentation, FDA compliance, and healthcare regulations. 
                Expertise in GxP documentation, clinical trial protocols, and regulatory submissions. 
                Former quality assurance lead at top pharmaceutical companies.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  FDA Compliance
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  Medical Devices
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                  GxP Documentation
                </span>
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">
                  Clinical Trials
                </span>
              </div>
            </div>

            {/* Team Member 3 - Financial & Legal Documentation (Amber) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Amber Chen
              </h3>
              <p className="text-amber-600 dark:text-amber-400 font-medium mb-3">
                Financial Services & Legal Documentation Expert
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                10+ years in financial compliance documentation, SEC filings, and banking regulations. 
                Specializes in FINRA compliance, risk management documentation, and legal technical writing. 
                Background in corporate law and financial services documentation.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs">
                  FINRA Compliance
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  SEC Filings
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  Risk Management
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                  Legal Writing
                </span>
              </div>
            </div>

            {/* Team Member 4 - Engineering & Scientific Documentation (Maria) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Maria Gonzalez
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                Engineering & Scientific Documentation Specialist
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                8+ years in aerospace and scientific documentation, including technical manuals, 
                research publications, and engineering specifications. PhD in Aerospace Engineering 
                with expertise in complex technical communication and scientific writing standards.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                  Aerospace Documentation
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  Scientific Writing
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  Engineering Specs
                </span>
                <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs">
                  Research Publications
                </span>
              </div>
            </div>
          </div>

          {/* Cooperative Network Section */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Cooperative Network
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Specialist Network</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Access to specialized writers across healthcare, finance, engineering, and technology sectors
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Expertise</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  International compliance knowledge and multi-language documentation capabilities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scalable Resources</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Flexible team scaling based on project complexity and timeline requirements
                </p>
              </div>
            </div>
          </div>

          {/* Cooperative Values */}
          <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why We Work as a Cooperative
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Shared Ownership & Decision Making
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  As a cooperative, every team member has a voice in how we operate, what projects we take on, 
                  and how we serve our clients. This ensures alignment between our values and our work.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Equitable Compensation & Growth
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our cooperative structure ensures fair compensation for all members and reinvests profits 
                  back into the business to support professional development and better client service.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Collaborative Excellence
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Working cooperatively means every project benefits from multiple perspectives and expertise areas, 
                  resulting in higher quality outcomes than any individual could achieve alone.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Community & Sustainability
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We're committed to sustainable business practices that support both our team members and 
                  the broader technical writing community through mentorship and knowledge sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Innovation Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🚀 Advanced Quality Innovation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 max-w-3xl mx-auto">
              We've developed proprietary quality assurance systems that ensure the highest standards in documentation 
              through comprehensive source verification and multi-stage review processes.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Research Excellence</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced systems for finding and verifying peer-reviewed sources from academic databases and regulatory publications
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Iterative Review</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Content undergoes multiple review cycles until 100% accuracy is achieved, ensuring the highest quality output
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Verification</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Only content that passes all accuracy and compliance checks is released, guaranteeing reliability
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                <span className="mr-2">�</span>
                Learn About Our Process
              </a>
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
      
      <Footer />
    </div>
  )
}
