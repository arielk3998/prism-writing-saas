'use client';

import { motion } from 'framer-motion';
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
  Award,
  CheckCircle,
  PenTool,
  GraduationCap,
  Plane,
  Activity
} from 'lucide-react';

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
    },
    {
      name: 'Zotero',
      description: 'Reference management and citation tool',
      category: 'Research Tools',
      url: 'https://zotero.org/',
      features: ['Citation Management', 'PDF Annotation', 'Collaboration'],
      pricing: 'Free with storage limits'
    }
  ];

  const templates = [
    {
      name: 'Technical Documentation Template',
      description: 'Complete template for software and API documentation',
      category: 'Technical Writing',
      downloadUrl: '/downloads/templates/technical-documentation-template.docx',
      features: ['User Guides', 'API Reference', 'Installation Instructions'],
      format: 'DOCX'
    },
    {
      name: 'Business Proposal Template',
      description: 'Professional template for business proposals and RFPs',
      category: 'Business Writing',
      downloadUrl: '/downloads/templates/business-proposal-template.docx',
      features: ['Executive Summary', 'Cost Breakdown', 'Timeline'],
      format: 'DOCX'
    },
    {
      name: 'Compliance Manual Template',
      description: 'Framework for regulatory compliance documentation',
      category: 'Compliance',
      downloadUrl: '/downloads/templates/compliance-manual-template.docx',
      features: ['Policy Framework', 'Audit Checklists', 'Training Materials'],
      format: 'DOCX'
    },
    {
      name: 'Aviation Maintenance Manual',
      description: 'FAA-compliant maintenance procedure documentation',
      category: 'Aviation',
      downloadUrl: '/downloads/templates/aviation-maintenance-template.docx',
      features: ['Procedure Steps', 'Safety Checklists', 'Parts Lists'],
      format: 'DOCX'
    }
  ];

  const industryStandards = [
    {
      name: 'ISO/IEC 26514',
      description: 'Requirements for designers and developers of user documentation',
      category: 'Documentation Standards',
      url: 'https://www.iso.org/standard/43073.html',
      type: 'International Standard'
    },
    {
      name: 'IEEE 1063',
      description: 'Standard for Software User Documentation',
      category: 'Software Documentation',
      url: 'https://standards.ieee.org/standard/1063-2001.html',
      type: 'IEEE Standard'
    },
    {
      name: 'FAA Advisory Circulars',
      description: 'Guidance for aviation technical documentation',
      category: 'Aviation Standards',
      url: 'https://www.faa.gov/regulations_policies/advisory_circulars/',
      type: 'Aviation Standards'
    },
    {
      name: 'STC Guidelines',
      description: 'Society for Technical Communication best practices',
      category: 'Best Practices',
      url: 'https://www.stc.org/',
      type: 'Professional Guidelines'
    }
  ];

  const trainingResources = [
    {
      name: 'STC Certification',
      description: 'Professional certification in technical communication',
      category: 'Certification',
      url: 'https://www.stc.org/certification/',
      level: 'Professional',
      duration: 'Self-paced'
    },
    {
      name: 'Google Technical Writing Courses',
      description: 'Free courses on technical writing fundamentals',
      category: 'Online Training',
      url: 'https://developers.google.com/tech-writing',
      level: 'Beginner to Advanced',
      duration: '2-4 weeks'
    },
    {
      name: 'Plain Language Guidelines',
      description: 'Federal guidelines for clear government communication',
      category: 'Writing Standards',
      url: 'https://plainlanguage.gov/',
      level: 'All Levels',
      duration: 'Reference'
    },
    {
      name: 'Content Strategy Alliance',
      description: 'Professional development for content strategists',
      category: 'Strategy Training',
      url: 'https://www.contentstrategyalliance.org/',
      level: 'Professional',
      duration: 'Ongoing'
    }
  ];

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Writing Resources
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  & Tools
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Professional tools, templates, and training resources to enhance your technical writing and documentation projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12">
                <TabsTrigger value="tools">Writing Tools</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>

              <TabsContent value="tools">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Professional Writing Tools
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Essential tools to improve your writing quality, productivity, and collaboration.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {writingTools.map((tool, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <PenTool className="w-5 h-5 text-blue-600" />
                          </div>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Badge variant="secondary">{tool.category}</Badge>
                            <div>
                              <h4 className="font-semibold mb-2">Features:</h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {tool.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-blue-600">{tool.pricing}</span>
                              <Button size="sm" onClick={() => openUrl(tool.url)}>
                                Visit Tool <ExternalLink className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Professional Templates
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Ready-to-use templates for common technical writing and business documentation needs.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary">{template.category}</Badge>
                              <Badge variant="outline">{template.format}</Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Includes:</h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {template.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => handleDownload(template.downloadUrl, template.name)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="standards" id="standards">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Industry Standards & Guidelines
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Professional standards and best practices for technical writing and documentation.
                  </p>
                </div>

                {/* Aviation Section */}
                <div id="aviation" className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Plane className="w-6 h-6 mr-2 text-blue-600" />
                    Aviation Documentation Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>FAA Documentation Requirements</CardTitle>
                        <CardDescription>Federal Aviation Administration guidelines for technical documentation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Maintenance Manual Standards (14 CFR Part 43)</li>
                          <li>• Service Bulletin Formatting (AC 21-50)</li>
                          <li>• Technical Data Requirements (AC 21-31)</li>
                          <li>• Airworthiness Directive Compliance</li>
                        </ul>
                        <Button 
                          className="mt-4" 
                          size="sm" 
                          onClick={() => openUrl('https://www.faa.gov/regulations_policies/advisory_circulars/')}
                        >
                          View Standards <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>ATA Specification 100</CardTitle>
                        <CardDescription>Industry standard for aircraft maintenance documentation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Standardized Chapter Numbering</li>
                          <li>• Maintenance Task Cards</li>
                          <li>• Illustrated Parts Catalogs</li>
                          <li>• Component Maintenance Manuals</li>
                        </ul>
                        <Button 
                          className="mt-4" 
                          size="sm" 
                          onClick={() => openUrl('https://www.airlines.org/dataset/ata-specifications/')}
                        >
                          Learn More <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Compliance Section */}
                <div id="compliance" className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    Compliance Documentation Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>ISO 9001 Documentation</CardTitle>
                        <CardDescription>Quality management system documentation requirements</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Quality Manual Structure</li>
                          <li>• Process Documentation</li>
                          <li>• Record Keeping Requirements</li>
                          <li>• Audit Trail Documentation</li>
                        </ul>
                        <Button 
                          className="mt-4" 
                          size="sm" 
                          onClick={() => openUrl('https://www.iso.org/iso-9001-quality-management.html')}
                        >
                          View Standard <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>FDA 21 CFR Part 820</CardTitle>
                        <CardDescription>Medical device quality system regulation documentation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Design Control Documentation</li>
                          <li>• Device Master Record</li>
                          <li>• Corrective and Preventive Actions</li>
                          <li>• Management Responsibility</li>
                        </ul>
                        <Button 
                          className="mt-4" 
                          size="sm" 
                          onClick={() => openUrl('https://www.fda.gov/medical-devices/quality-systems-qsr/quality-system-qsr-regulation-part-820')}
                        >
                          View Regulation <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Technical Writing Section */}
                <div id="technical" className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Technical Writing Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {industryStandards.map((standard, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{standard.name}</CardTitle>
                              <Award className="w-5 h-5 text-blue-600" />
                            </div>
                            <CardDescription>{standard.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <Badge variant="secondary">{standard.category}</Badge>
                                <Badge variant="outline">{standard.type}</Badge>
                              </div>
                              <Button 
                                size="sm" 
                                className="w-full" 
                                onClick={() => openUrl(standard.url)}
                              >
                                View Standard <ExternalLink className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quality Assurance Section */}
                <div id="quality" className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-blue-600" />
                    Quality Assurance Guidelines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Document Review Process</CardTitle>
                        <CardDescription>Best practices for technical document review and approval</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Multi-level Review Process</li>
                          <li>• Technical Accuracy Verification</li>
                          <li>• Compliance Checking</li>
                          <li>• Version Control Standards</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Style Guide Development</CardTitle>
                        <CardDescription>Creating consistent style guidelines for technical documentation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Terminology Management</li>
                          <li>• Format Standardization</li>
                          <li>• Voice and Tone Guidelines</li>
                          <li>• Brand Consistency</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="training">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Professional Development
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Training resources and certification programs to advance your technical writing career.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trainingResources.map((course, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                          </div>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Badge variant="secondary">{course.category}</Badge>
                              <Badge variant="outline">{course.level}</Badge>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                              <span>Duration: {course.duration}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full" 
                              onClick={() => openUrl(course.url)}
                            >
                              Start Learning <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Documentation Solutions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our expert team can help you develop custom templates, style guides, and documentation systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => window.location.href = '/contact'}
              >
                Get Custom Solutions
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.location.href = '/portfolio'}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
