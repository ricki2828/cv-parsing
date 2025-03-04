import React, { useState } from 'react';
import { FileCode, Loader2 } from 'lucide-react';

interface JobDescriptionGeneratorProps {
  onGenerate: (jobDescription: { title: string; description: string; requirements: string[]; responsibilities: string[] }) => void;
}

const JobDescriptionGenerator: React.FC<JobDescriptionGeneratorProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('BPO/Contact Center');
  const [experience, setExperience] = useState('1-2 years');

  // Mock function to simulate AI generation
  const generateJobDescription = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockJobDescription = {
        title: jobTitle || 'Customer Service Representative',
        description: `We are looking for a ${jobTitle || 'Customer Service Representative'} to join our growing team in the ${industry} industry. The ideal candidate will have ${experience} of experience and excellent communication skills.`,
        requirements: [
          `${experience} of experience in a similar role`,
          'Excellent verbal and written communication skills',
          'Ability to work in a fast-paced environment',
          'Computer literacy and typing skills',
          'Problem-solving abilities',
          'Matric certificate or equivalent qualification'
        ],
        responsibilities: [
          'Handle customer inquiries via phone, email, or chat',
          'Resolve customer complaints and issues',
          'Process orders, forms, applications, and requests',
          'Maintain customer records',
          'Meet performance standards',
          'Follow communication scripts when handling different scenarios'
        ]
      };
      
      setIsGenerating(false);
      onGenerate(mockJobDescription);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <FileCode className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">AI Job Description Generator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Sales Representative, Customer Service Agent"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="BPO/Contact Center">BPO/Contact Center</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience Required
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="No experience">No experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-3 years">2-3 years</option>
            <option value="3+ years">3+ years</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Requirements (Optional)
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Enter any specific skills, qualifications, or responsibilities you'd like to include..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={generateJobDescription}
          disabled={isGenerating}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Generating...
            </>
          ) : (
            'Generate Job Description'
          )}
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionGenerator;