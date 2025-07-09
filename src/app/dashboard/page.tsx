'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  status: string;
  client?: {
    name: string;
  };
}

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  company?: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, leadsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/leads')
        ]);
        
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData);
        }
        
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-lg font-semibold text-gray-700">Active Projects</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {projects.filter(p => p.status === 'IN_PROGRESS').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-lg font-semibold text-gray-700">Total Projects</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{projects.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-lg font-semibold text-gray-700">New Leads</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {leads.filter(l => l.status === 'NEW').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-lg font-semibold text-gray-700">Total Leads</h2>
          <p className="text-3xl font-bold text-orange-600 mt-2">{leads.length}</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.client?.name}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  project.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-4">No projects yet</p>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <h3 className="font-medium text-gray-900">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  lead.status === 'NEW' ? 'bg-green-100 text-green-800' :
                  lead.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {leads.length === 0 && (
              <p className="text-gray-500 text-center py-4">No leads yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
