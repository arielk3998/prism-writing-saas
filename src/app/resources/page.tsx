'use client';

import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  ExternalLink, 
  Download, 
  BookOpen, 
  FileText, 
  Shield,
  Activity
} from 'lucide-react';
import { TranslationTool } from '@/components/translation-tool';

export default function ResourcesPage() {
  const writingTools = [
    {
      name: 'Grammarly Business',
      description: 'Advanced grammar and style checking for professional writing',
      category: 'Writing Tools',
      url: 'https://grammarly.com/business',
      features: ['Grammar Check', 'Style Suggestions', 'Tone Detection'],
      pricing: 'Free basic version'
    },
    {
      name: 'Hemingway Editor',
      description: 'Readability analyzer for clear, concise writing',
      category: 'Writing Tools',
      url: 'https://hemingwayapp.com/',
      features: ['Readability Score', 'Sentence Structure', 'Clarity Analysis'],
      pricing: 'Free online version'
    },
    {
      name: 'Notion',
      description: 'All-in-one workspace for notes, docs, and collaboration',
      category: 'Documentation',
      url: 'https://notion.so/',
      features: ['Rich Text Editing', 'Templates', 'Team Collaboration'],
      pricing: 'Free for personal use'
    }
  ];

  const templates = [
    {
      name: 'Technical Documentation Template',
      description: 'Professional template for technical manuals and guides',
      category: 'Technical Writing',
      downloadUrl: '/downloads/templates/technical-doc-template.docx',
      features: ['Standard Structure', 'Style Guide', 'Version Control'],
      format: 'DOCX'
    },
    {
      name: 'Compliance Manual Template',
      description: 'Structured template for regulatory compliance documentation',
      category: 'Compliance',
      downloadUrl: '/downloads/templates/compliance-manual-template.docx',
      features: ['Policy Framework', 'Audit Checklists', 'Training Materials'],
      format: 'DOCX'
    },
    {
      name: 'Software Documentation Template',
      description: 'Comprehensive template for software product documentation',
      category: 'Software',
      downloadUrl: '/downloads/templates/Software_Documentation_Template.md',
      features: ['Installation Guide', 'API Docs', 'Troubleshooting'],
      format: 'Markdown'
    },
    {
      name: 'Healthcare Compliance Template',
      description: 'FDA and medical device compliance documentation template',
      category: 'Healthcare',
      downloadUrl: '/downloads/templates/Healthcare_Compliance_Template.md',
      features: ['GxP Standards', 'Risk Management', 'CAPA Process'],
      format: 'Markdown'
    },
    {
      name: 'Financial Services Documentation',
      description: 'FINRA and banking compliance documentation template',
      category: 'Finance',
      downloadUrl: '/downloads/templates/Financial_Services_Documentation_Template.md',
      features: ['Regulatory Framework', 'KYC Procedures', 'Risk Controls'],
      format: 'Markdown'
    },
    {
      name: 'API Documentation Template',
      description: 'Modern template for API documentation and developer guides',
      category: 'Technical',
      downloadUrl: '/downloads/templates/API_Documentation_Template.md',
      features: ['Endpoint Documentation', 'Code Examples', 'Authentication'],
      format: 'Markdown'
    },
    {
      name: 'SOP Template',
      description: 'Standard Operating Procedure template for all industries',
      category: 'Operations',
      downloadUrl: '/downloads/templates/Standard_Operating_Procedure_Template.md',
      features: ['Step-by-Step Process', 'Quality Controls', 'Training Guide'],
      format: 'Markdown'
    },
    {
      name: 'Training Manual Template',
      description: 'Comprehensive template for employee training materials',
      category: 'Training',
      downloadUrl: '/downloads/templates/Training_Manual_Template.docx',
      features: ['Learning Objectives', 'Assessment Tools', 'Progress Tracking'],
      format: 'DOCX'
    },
    {
      name: 'User Manual Template',
      description: 'User-friendly template for product user manuals',
      category: 'User Documentation',
      downloadUrl: '/downloads/templates/User_Manual_Template.md',
      features: ['Getting Started', 'Feature Guide', 'FAQs'],
      format: 'Markdown'
    },
    {
      name: 'Grant Proposal Template',
      description: 'Professional template for grant applications and proposals',
      category: 'Grant Writing',
      downloadUrl: '/downloads/templates/Grant_Proposal_Template.docx',
      features: ['Budget Planning', 'Project Timeline', 'Impact Assessment'],
      format: 'DOCX'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technical Writing Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of tools, standards, and downloadable resources for technical writers and content professionals
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="standards" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Standards
            </TabsTrigger>
            <TabsTrigger value="industries" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Industries
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* Tools Tab */}
          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writingTools.map((tool, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">{tool.pricing}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(tool.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Standards Tab */}
          <TabsContent value="standards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ISO/IEC 26514</CardTitle>
                  <CardDescription>Requirements for designers and developers of user documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Documentation planning and design</li>
                    <li>• User analysis and testing</li>
                    <li>• Information architecture</li>
                    <li>• Content organization standards</li>
                  </ul>
                  <Button 
                    className="mt-4" 
                    size="sm" 
                    onClick={() => window.open('https://www.iso.org/standard/43073.html', '_blank')}
                  >
                    Learn More <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Microsoft Writing Style Guide</CardTitle>
                  <CardDescription>Comprehensive style guide for technical communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Voice and tone guidelines</li>
                    <li>• Terminology standards</li>
                    <li>• Formatting conventions</li>
                    <li>• Accessibility best practices</li>
                  </ul>
                  <Button 
                    className="mt-4" 
                    size="sm" 
                    onClick={() => window.open('https://docs.microsoft.com/style-guide/', '_blank')}
                  >
                    Access Guide <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Industries Standards Tab */}
          <TabsContent value="industries">
            <div className="space-y-8">
              
              {/* Software Development & IT */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  💻 Software Development & IT
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Microsoft Manual of Style:</strong> Documentation for Microsoft software products</li>
                      <li>• <strong>Google Developer Documentation Style Guide:</strong> Comprehensive code documentation guide</li>
                      <li>• <strong>The Chicago Manual of Style:</strong> Tech writing editing and publishing</li>
                      <li>• <strong>Javadoc:</strong> Standards for documenting Java code</li>
                      <li>• <strong>DocBook:</strong> XML-based structured documentation standard</li>
                      <li>• <strong>Doxygen:</strong> Documentation for C++, C, Java, and other languages</li>
                      <li>• <strong>OpenAPI Specification (OAS):</strong> API documentation standards</li>
                      <li>• <strong>JSON Schema:</strong> Data validation and documentation</li>
                      <li>• <strong>GraphQL Schema Definition Language:</strong> API documentation for GraphQL</li>
                      <li>• <strong>ISO/IEC 26514:</strong> Requirements for user documentation</li>
                      <li>• <strong>Agile Documentation Practices:</strong> Lean documentation approaches</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>IBM Style Guide:</strong> Content formatting and structuring</li>
                      <li>• <strong>Red Hat Documentation Guidelines:</strong> Linux and open-source standards</li>
                      <li>• <strong>Write the Docs:</strong> Global documentation community</li>
                      <li>• <strong>TechWhirl:</strong> Technical writing best practices resource</li>
                      <li>• <strong>GitLab Documentation Style Guide:</strong> Modern DevOps documentation</li>
                      <li>• <strong>Atlassian Design System:</strong> UX writing and content guidelines</li>
                      <li>• <strong>Stack Overflow Developer Survey:</strong> Annual industry trends</li>
                      <li>• <strong>GitHub Docs:</strong> Open source documentation practices</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Healthcare & Medical Devices */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏥 Healthcare & Medical Devices
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ISO 9001:</strong> Quality management for medical device manufacturing</li>
                      <li>• <strong>ISO 13485:</strong> Medical device quality management systems</li>
                      <li>• <strong>FDA 21 CFR Part 820:</strong> US medical device documentation standards</li>
                      <li>• <strong>GxP (GLP, GCP, GMP):</strong> Good Documentation Practices for regulated industries</li>
                      <li>• <strong>IEC 82079-1:</strong> Instructions for use (IFUs) for medical devices</li>
                      <li>• <strong>FDA User Instructions Guidance:</strong> Medical product user instructions</li>
                      <li>• <strong>ISO 14971:</strong> Risk management for medical devices</li>
                      <li>• <strong>ISO 62304:</strong> Medical device software life cycle processes</li>
                      <li>• <strong>HIPAA Compliance:</strong> Healthcare data documentation requirements</li>
                      <li>• <strong>MDR (EU 2017/745):</strong> European Medical Device Regulation</li>
                      <li>• <strong>CLIA Guidelines:</strong> Clinical Laboratory Improvement Amendments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>US FDA Guidance Documents:</strong> Medical device documentation guidelines</li>
                      <li>• <strong>Health Literacy Guidelines:</strong> Medical document readability and usability</li>
                      <li>• <strong>MedTech Europe Guidelines:</strong> Medical technology documentation standards</li>
                      <li>• <strong>AMWA (American Medical Writers Association):</strong> Medical writing best practices</li>
                      <li>• <strong>EMA (European Medicines Agency):</strong> Regulatory documentation guidelines</li>
                      <li>• <strong>WHO Technical Reports:</strong> Global health documentation standards</li>
                      <li>• <strong>ISPE GAMP 5:</strong> Pharmaceutical computer systems validation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Engineering */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  ⚙️ Engineering (Aerospace, Automotive, Civil)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>MIL-STD-38784:</strong> Military/aerospace user manuals and tech docs</li>
                      <li>• <strong>ISO 9001:</strong> Quality management in engineering projects</li>
                      <li>• <strong>ANSI/ISO 9000:</strong> Quality management documentation compliance</li>
                      <li>• <strong>ASME Y14.100:</strong> Technical drawing and documentation practices</li>
                      <li>• <strong>SAE AS9100:</strong> Aerospace-specific quality management standards</li>
                      <li>• <strong>ISO 17100:</strong> Translation services for engineering documents</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>International Technical Communication Standards (ITC):</strong> Engineering documentation</li>
                      <li>• <strong>Society for Technical Communication (STC):</strong> Engineering documentation guidelines</li>
                      <li>• <strong>Aerospace and Defense Standards:</strong> Aerospace documentation requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finance & Banking */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  💰 Finance & Banking
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>FINRA Rules:</strong> Customer-facing financial services documents</li>
                      <li>• <strong>GDPR:</strong> Personal data documentation and handling in finance</li>
                      <li>• <strong>PCI DSS:</strong> Financial data security documentation standards</li>
                      <li>• <strong>ISO 20022:</strong> Financial services messaging standards</li>
                      <li>• <strong>IFRS:</strong> International Financial Reporting Standards</li>
                      <li>• <strong>GAAP:</strong> Generally Accepted Accounting Principles documentation</li>
                      <li>• <strong>Basel III:</strong> Banking regulatory documentation requirements</li>
                      <li>• <strong>SOX (Sarbanes-Oxley):</strong> Financial documentation and controls</li>
                      <li>• <strong>COSO Framework:</strong> Internal control documentation</li>
                      <li>• <strong>SWIFT Standards:</strong> International payment messaging</li>
                      <li>• <strong>XBRL:</strong> Business reporting language standards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Financial Industry Standards:</strong> Reports, forms, and financial documents</li>
                      <li>• <strong>CFPB Guidelines:</strong> Financial product documentation transparency</li>
                      <li>• <strong>SEC Disclosure Rules:</strong> Public company documentation requirements</li>
                      <li>• <strong>FDIC Documentation Guidelines:</strong> Banking documentation standards</li>
                      <li>• <strong>Investment Company Institute:</strong> Fund documentation best practices</li>
                      <li>• <strong>ISDA Documentation:</strong> Derivatives and trading documentation</li>
                      <li>• <strong>FCA Handbook:</strong> UK financial services documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Telecommunications */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📡 Telecommunications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ITU-T Recommendations:</strong> International Telecommunication Union guidelines</li>
                      <li>• <strong>3GPP Specifications:</strong> Mobile network development documentation</li>
                      <li>• <strong>ISO/IEC 12207:</strong> Software life cycle processes for telecommunications</li>
                      <li>• <strong>ETSI Standards:</strong> European telecommunications documentation standards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Telecommunications Industry Association (TIA):</strong> Telecom product documentation</li>
                      <li>• <strong>Telecom Documentation Resources (TDR):</strong> Technical writing improvement resources</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Energy & Utilities */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  ⚡ Energy & Utilities
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ISO 50001:</strong> Energy management documentation standards</li>
                      <li>• <strong>NEI 04-07:</strong> Nuclear facility operations and maintenance procedures</li>
                      <li>• <strong>API Standard 650:</strong> Oil and gas tank construction documentation</li>
                      <li>• <strong>ASME B31.3:</strong> Process piping infrastructure documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Institute of Energy:</strong> Energy sector documentation best practices</li>
                      <li>• <strong>IAEA Guidelines:</strong> Nuclear energy sector documentation standards</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legal & Compliance */}
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  ⚖️ Legal & Compliance
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ISO/IEC 27001:</strong> Information security documentation in legal sector</li>
                      <li>• <strong>GDPR:</strong> Personal data documentation compliance with EU laws</li>
                      <li>• <strong>ISO 9001:</strong> Quality management in law firms and compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Legal Writing Institute:</strong> Legal document drafting best practices</li>
                      <li>• <strong>Legal Information Institute (LII):</strong> Legal documentation tools and guidance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Training */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🎓 Education & Training
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>SCORM:</strong> Sharable Content Object Reference Model for e-learning</li>
                      <li>• <strong>AICC:</strong> Aviation Industry CBT Committee standards</li>
                      <li>• <strong>ISO 21001:</strong> Educational organizations documentation standards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Learning and Performance Institute:</strong> Training documentation resources</li>
                      <li>• <strong>AECT:</strong> Educational content writing guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Retail & Consumer Products */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🛍️ Retail & Consumer Products
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>CPSC Guidelines:</strong> Product labeling and documentation for safety</li>
                      <li>• <strong>ISO 9001:</strong> Quality management for retail and consumer products</li>
                      <li>• <strong>ISO 14001:</strong> Environmental management documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>RILA:</strong> Retail industry documentation guidelines</li>
                      <li>• <strong>Product Safety Australia:</strong> Retail product safety documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Scientific & Research */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🔬 Scientific & Research
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ISO 17100:</strong> Translation services for scientific documentation</li>
                      <li>• <strong>COPE:</strong> Committee on Publication Ethics guidelines</li>
                      <li>• <strong>PLOS Style Guide:</strong> Scientific research article documentation</li>
                      <li>• <strong>NIH Style Guide:</strong> Research study documentation guidelines</li>
                      <li>• <strong>APA Style:</strong> Psychological and social sciences documentation</li>
                      <li>• <strong>IEEE Standards:</strong> Engineering and technology research documentation</li>
                      <li>• <strong>ICMJE Guidelines:</strong> Medical journal manuscript preparation</li>
                      <li>• <strong>ISO 9001:</strong> Quality management for research organizations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Scientific Writing Resources:</strong> Research papers and scientific documentation</li>
                      <li>• <strong>Open Science Resources:</strong> Open-access scientific content writing guides</li>
                      <li>• <strong>Nature Writing Guide:</strong> Scientific publication standards</li>
                      <li>• <strong>Science Journals Style Guides:</strong> Peer-reviewed publication standards</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Manufacturing & Industrial */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏭 Manufacturing & Industrial
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>ISO 9001:</strong> Quality management systems documentation</li>
                      <li>• <strong>ISO 14001:</strong> Environmental management systems</li>
                      <li>• <strong>ISO 45001:</strong> Occupational health and safety management</li>
                      <li>• <strong>ANSI Standards:</strong> American National Standards Institute guidelines</li>
                      <li>• <strong>Six Sigma Documentation:</strong> Process improvement documentation</li>
                      <li>• <strong>Lean Manufacturing:</strong> Waste reduction documentation practices</li>
                      <li>• <strong>OSHA Requirements:</strong> Workplace safety documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>NIST Manufacturing Guidelines:</strong> Industry documentation standards</li>
                      <li>• <strong>IEC Standards:</strong> International Electrotechnical Commission</li>
                      <li>• <strong>Industrial Safety Documentation:</strong> Workplace safety writing guides</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Government & Public Sector */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🏛️ Government & Public Sector
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>Plain Language Act:</strong> Clear communication in government documents</li>
                      <li>• <strong>Section 508:</strong> Accessibility standards for federal documents</li>
                      <li>• <strong>Federal Register Style Manual:</strong> Government publication standards</li>
                      <li>• <strong>FOIA Guidelines:</strong> Freedom of Information Act documentation</li>
                      <li>• <strong>GPO Style Manual:</strong> Government Printing Office standards</li>
                      <li>• <strong>ISO 15489:</strong> Records management documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>PlainLanguage.gov:</strong> Government writing improvement resources</li>
                      <li>• <strong>Digital.gov:</strong> Digital service documentation guidelines</li>
                      <li>• <strong>NARA Guidelines:</strong> National Archives documentation standards</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Aerospace & Defense */}
              <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🚀 Aerospace & Defense
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>MIL-STD-38784:</strong> Military/aerospace user manuals and tech docs</li>
                      <li>• <strong>SAE AS9100:</strong> Aerospace quality management standards</li>
                      <li>• <strong>RTCA DO-178C:</strong> Software considerations in airborne systems</li>
                      <li>• <strong>NASA Documentation Standards:</strong> Space systems documentation</li>
                      <li>• <strong>DOD-STD-2167A:</strong> Defense system software development</li>
                      <li>• <strong>ITAR Compliance:</strong> International Traffic in Arms Regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>FAA Documentation Guidelines:</strong> Aviation documentation standards</li>
                      <li>• <strong>AIAA Standards:</strong> Aerospace industry documentation</li>
                      <li>• <strong>Defense Acquisition University:</strong> Defense documentation training</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Food & Agriculture */}
              <div className="bg-lime-50 dark:bg-lime-900/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🌾 Food & Agriculture
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Standards & Best Practices</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>HACCP Documentation:</strong> Hazard Analysis Critical Control Points</li>
                      <li>• <strong>FDA Food Code:</strong> Food safety documentation standards</li>
                      <li>• <strong>USDA FSIS Guidelines:</strong> Food Safety and Inspection Service</li>
                      <li>• <strong>ISO 22000:</strong> Food safety management systems</li>
                      <li>• <strong>Good Agricultural Practices (GAP):</strong> Farm documentation standards</li>
                      <li>• <strong>Organic Certification:</strong> USDA organic documentation requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• <strong>FDA Guidance Documents:</strong> Food industry documentation</li>
                      <li>• <strong>Codex Alimentarius:</strong> International food standards</li>
                      <li>• <strong>Agricultural Technical Writing:</strong> Farm and food industry documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Writing Courses</CardTitle>
                  <CardDescription>Professional development and certification programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Google Technical Writing Course (Free)</li>
                    <li>• Society for Technical Communication (STC)</li>
                    <li>• Coursera Technical Writing Specialization</li>
                    <li>• University certification programs</li>
                  </ul>
                  <Button 
                    className="mt-4" 
                    size="sm" 
                    onClick={() => window.open('https://developers.google.com/tech-writing', '_blank')}
                  >
                    Start Learning <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Industry Workshops</CardTitle>
                  <CardDescription>Hands-on training and networking opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• STC Annual Summit</li>
                    <li>• Write the Docs Conference</li>
                    <li>• API documentation workshops</li>
                    <li>• Compliance writing seminars</li>
                  </ul>
                  <Button 
                    className="mt-4" 
                    size="sm" 
                    onClick={() => window.open('https://www.stc.org/', '_blank')}
                  >
                    Find Events <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary">{template.format}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = template.downloadUrl;
                          link.download = '';
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Translation Tool */}
        <div className="mt-12">
          <TranslationTool />
        </div>

        {/* Global Compliance Section */}
        <TranslationTool showInline={true} className="mb-12" />

        {/* Resource Update Assurance Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            📅 Always Up-to-Date Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Continuous Resource Updates
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• <strong>Monthly Reviews:</strong> All industry standards and resources reviewed monthly</li>
                <li>• <strong>Regulatory Monitoring:</strong> Automated tracking of regulatory changes and updates</li>
                <li>• <strong>Industry Partnerships:</strong> Direct connections with standards organizations</li>
                <li>• <strong>Expert Network:</strong> Global cooperative of industry specialists providing updates</li>
                <li>• <strong>Version Control:</strong> All templates and resources version-controlled and dated</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quality Assurance Process
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• <strong>Expert Validation:</strong> All updates reviewed by industry experts</li>
                <li>• <strong>Compliance Verification:</strong> Cross-referenced with latest regulations</li>
                <li>• <strong>Client Feedback:</strong> Continuous improvement based on user feedback</li>
                <li>• <strong>Audit Trail:</strong> Complete documentation of all resource changes</li>
                <li>• <strong>Notification System:</strong> Alerts for significant industry changes</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Last Updated:</strong> All resources current as of July 2025. Next scheduled review: August 2025. 
              <span className="ml-2">✅ All standards verified against latest regulatory publications</span>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Need Custom Resources?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our team can create custom documentation templates, 
            style guides, and training materials tailored to your specific needs.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.href = '/contact'}>
              <Activity className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/services'}>
              <FileText className="w-4 h-4 mr-2" />
              View Services
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
