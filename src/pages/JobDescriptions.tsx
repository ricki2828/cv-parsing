import React, { useState } from 'react';
import { mockJobDescriptions } from '../data/mockData';
import { JobDescription } from '../types';
import { formatDate } from '../lib/utils';
import JobDescriptionGenerator from '../components/JobDescriptionGenerator';
import JobDescriptionEditor from '../components/JobDescriptionEditor';
import { Plus, Edit, Trash2, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const JobDescriptions: React.FC = () => {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>(mockJobDescriptions);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleCreateJobDescription = (data: {
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }) => {
    const newJobDescription: JobDescription = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setJobDescriptions([newJobDescription, ...jobDescriptions]);
    setIsCreating(false);
  };

  const handleUpdateJobDescription = (data: {
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }) => {
    if (!isEditing) return;
    
    const updatedJobDescriptions = jobDescriptions.map(jd => 
      jd.id === isEditing 
        ? { ...jd, ...data, updatedAt: new Date() } 
        : jd
    );
    
    setJobDescriptions(updatedJobDescriptions);
    setIsEditing(null);
  };

  const handleDeleteJobDescription = (id: string) => {
    if (confirm('Are you sure you want to delete this job description?')) {
      setJobDescriptions(jobDescriptions.filter(jd => jd.id !== id));
    }
  };

  const toggleDescription = (id: string) => {
    setExpandedDescription(expandedDescription === id ? null : id);
  };

  const handleGeneratedJobDescription = (data: {
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }) => {
    setIsCreating(true);
    setShowGenerator(false);
    // Pre-fill the editor with the generated content
    setTimeout(() => {
      const editor = document.getElementById('job-description-editor');
      if (editor) {
        editor.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Descriptions</h1>
        <div className="space-x-3">
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            AI Generator
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Job Description
          </button>
        </div>
      </div>
      
      {showGenerator && (
        <div className="mb-6">
          <JobDescriptionGenerator onGenerate={handleGeneratedJobDescription} />
        </div>
      )}
      
      {isCreating && (
        <div id="job-description-editor" className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Job Description</h2>
          <JobDescriptionEditor onSave={handleCreateJobDescription} />
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {isEditing && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Job Description</h2>
          <JobDescriptionEditor 
            initialData={jobDescriptions.find(jd => jd.id === isEditing)} 
            onSave={handleUpdateJobDescription} 
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsEditing(null)}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptions;