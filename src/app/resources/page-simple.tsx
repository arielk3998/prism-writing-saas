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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Tools
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

        {/* CTA Section */}
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
