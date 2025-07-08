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
  Zap, 
  FileText, 
  Bot, 
  BookOpen,
  Shield,
  Rocket
} from 'lucide-react';

export default function ResourcesPage() {

  const freeAPIs = [
    {
      name: 'OpenAI API',
      description: 'GPT models for text generation, summarization, and more',
      category: 'AI',
      url: 'https://openai.com/api/',
      features: ['Text Generation', 'Code Completion', 'Summarization'],
      pricing: 'Free tier available'
    },
    {
      name: 'Google Translate API',
      description: 'Real-time translation for 100+ languages',
      category: 'Translation',
      url: 'https://cloud.google.com/translate',
      features: ['100+ Languages', 'Real-time', 'Batch Processing'],
      pricing: 'Free quota included'
    },
    {
      name: 'GitHub API',
      description: 'Version control and collaboration workflows',
      category: 'Version Control',
      url: 'https://docs.github.com/en/rest',
      features: ['Repository Management', 'Issue Tracking', 'CI/CD'],
      pricing: 'Free for public repos'
    },
    {
      name: 'ConvertAPI',
      description: 'Convert documents between 200+ formats',
      category: 'File Conversion',
      url: 'https://www.convertapi.com/',
      features: ['200+ Formats', 'Batch Processing', 'Cloud Storage'],
      pricing: '1500 free conversions/month'
    },
    {
      name: 'Grammarly API',
      description: 'Grammar and writing enhancement',
      category: 'Writing Tools',
      url: 'https://developer.grammarly.com/',
      features: ['Grammar Check', 'Style Suggestions', 'Tone Detection'],
      pricing: 'Free tier available'
    },
    {
      name: 'Notion API',
      description: 'Document and knowledge management',
      category: 'Documentation',
      url: 'https://developers.notion.com/',
      features: ['Database Integration', 'Rich Text', 'Collaboration'],
      pricing: 'Free for personal use'
    }
  ];

  const aiTools = [
    {
      name: 'ChatGPT',
      description: 'Advanced conversational AI for writing assistance',
      category: 'Writing Assistant',
      url: 'https://chat.openai.com/',
      features: ['Content Generation', 'Editing', 'Research'],
      pricing: 'Free tier available'
    },
    {
      name: 'Claude',
      description: 'AI assistant for analysis and writing',
      category: 'Writing Assistant',
      url: 'https://claude.ai/',
      features: ['Document Analysis', 'Code Review', 'Research'],
      pricing: 'Free tier available'
    },
    {
      name: 'Hemingway Editor',
      description: 'Writing clarity and readability analyzer',
      category: 'Editing',
      url: 'https://hemingwayapp.com/',
      features: ['Readability Score', 'Style Suggestions', 'Complexity Analysis'],
      pricing: 'Free web version'
    },
    {
      name: 'Zapier',
      description: 'Workflow automation between apps',
      category: 'Automation',
      url: 'https://zapier.com/',
      features: ['5000+ App Integrations', 'No-Code Automation', 'Triggers & Actions'],
      pricing: 'Free plan available'
    }
  ];

  const standards = [
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
      name: 'ANSI/NISO Z39.18',
      description: 'Scientific and Technical Reports',
      category: 'Technical Reports',
      url: 'https://www.niso.org/publications/z3918-2005-r2010',
      type: 'ANSI Standard'
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
      category: 'Free Course',
      url: 'https://developers.google.com/tech-writing',
      level: 'Beginner to Advanced',
      duration: '2-4 hours each'
    },
    {
      name: 'Coursera Technical Writing',
      description: 'University-level technical writing courses',
      category: 'Online Course',
      url: 'https://www.coursera.org/courses?query=technical%20writing',
      level: 'All Levels',
      duration: '4-8 weeks'
    }
  ];

  const sampleDocuments = [
    {
      name: 'MediTech SOPs Healthcare Sample',
      description: 'Standard Operating Procedures for healthcare technology',
      type: 'PDF',
      size: '2.3 MB',
      category: 'Healthcare',
      downloadUrl: '/downloads/MediTech_SOPs_Healthcare_Sample.pdf'
    },
    {
      name: 'PaymentPro API Documentation Sample',
      description: 'Complete API documentation for payment processing',
      type: 'PDF',
      size: '1.8 MB',
      category: 'Technology',
      downloadUrl: '/downloads/PaymentPro_API_Documentation_Sample.pdf'
    },
    {
      name: 'SmartCity Installation Manual Sample',
      description: 'Installation and setup guide for smart city infrastructure',
      type: 'PDF',
      size: '3.1 MB',
      category: 'Infrastructure',
      downloadUrl: '/downloads/SmartCity_Installation_Manual_Sample.pdf'
    }
  ];

  const documentTemplates = [
    {
      name: 'Technical Writing Project Proposal Template',
      description: 'Comprehensive template for project proposals with pricing and timeline',
      type: 'Markdown',
      size: '12 KB',
      category: 'Business',
      downloadUrl: '/downloads/templates/Technical_Writing_Project_Proposal_Template.md'
    },
    {
      name: 'API Documentation Template',
      description: 'Complete template for REST API documentation with examples',
      type: 'Markdown',
      size: '18 KB',
      category: 'Technology',
      downloadUrl: '/downloads/templates/API_Documentation_Template.md'
    },
    {
      name: 'User Manual Template',
      description: 'Professional user manual template with troubleshooting and FAQ',
      type: 'Markdown',
      size: '22 KB',
      category: 'Documentation',
      downloadUrl: '/downloads/templates/User_Manual_Template.md'
    },
    {
      name: 'Standard Operating Procedure Template',
      description: 'Industry-standard SOP template with quality control and compliance',
      type: 'Markdown',
      size: '16 KB',
      category: 'Process',
      downloadUrl: '/downloads/templates/Standard_Operating_Procedure_Template.md'
    }
  ];

  const standardsDocuments = [
    {
      name: 'ISO/IEC 82304-1 Health Software Requirements',
      description: 'Guidelines for health software safety and compliance requirements',
      type: 'Markdown',
      size: '8 KB',
      category: 'Healthcare',
      downloadUrl: '/downloads/standards/ISO_IEC_82304-1_Health_Software_Requirements.md'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Technical Writing Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of APIs, tools, standards, and downloadable resources 
            for technical writers and content professionals
          </p>
        </motion.div>

        {/* Resource Categories */}
        <Tabs defaultValue="apis" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="apis" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              APIs
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="standards" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Standards
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="samples" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Samples
            </TabsTrigger>
          </TabsList>

          {/* Free APIs Section */}
          <TabsContent value="apis">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {freeAPIs.map((api, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <Badge variant="secondary">{api.category}</Badge>
                      </div>
                      <CardDescription>{api.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {api.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600 font-medium">
                            {api.pricing}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(api.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* AI Tools Section */}
          <TabsContent value="ai-tools">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {aiTools.map((tool, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
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
                          <span className="text-sm text-green-600 font-medium">
                            {tool.pricing}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(tool.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Try Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Standards Section */}
          <TabsContent value="standards">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Industry Standards */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Industry Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {standards.map((standard, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{standard.name}</CardTitle>
                            <Badge variant="secondary">{standard.type}</Badge>
                          </div>
                          <CardDescription>{standard.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {standard.category}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(standard.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Downloadable Standards Documents */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Standards Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standardsDocuments.map((doc, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{doc.name}</CardTitle>
                            <Badge variant="secondary">{doc.category}</Badge>
                          </div>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Format:</span>
                              <span className="font-medium">{doc.type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Size:</span>
                              <span className="font-medium">{doc.size}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = doc.downloadUrl;
                                link.download = doc.name;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Guide
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Templates Section */}
          <TabsContent value="templates">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {documentTemplates.map((template, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Format:</span>
                          <span className="font-medium">{template.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Size:</span>
                          <span className="font-medium">{template.size}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = template.downloadUrl;
                            link.download = template.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Training Section */}
          <TabsContent value="training">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {trainingResources.map((resource, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <Badge variant="secondary">{resource.category}</Badge>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Level:</span>
                          <span className="font-medium">{resource.level}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{resource.duration}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Sample Documents Section */}
          <TabsContent value="samples">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sampleDocuments.map((doc, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </div>
                      <CardDescription>{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Format:</span>
                          <span className="font-medium">{doc.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Size:</span>
                          <span className="font-medium">{doc.size}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = doc.downloadUrl;
                            link.download = doc.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Sample
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 bg-muted rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Need Custom Resources?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our team can create custom documentation templates, 
            API integrations, and automation workflows tailored to your specific needs.
          </p>
          <Button 
            onClick={() => window.location.href = '/contact'}
            className="mr-4"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/assessment'}
          >
            <FileText className="w-4 h-4 mr-2" />
            Project Assessment
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
