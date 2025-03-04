import React from 'react';
import { Candidate } from '../types';
import { formatDate } from '../lib/utils';
import { X, Phone, Mail, Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface ResumeViewerProps {
  candidate: Candidate | null;
  onClose: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resume: {candidate.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-semibold mx-auto">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-xl font-semibold text-center mt-4">{candidate.name}</h3>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Uploaded: {formatDate(candidate.uploadDate)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Match Score</h4>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full" 
                      style={{ width: `${candidate.score}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 font-medium">{candidate.score}%</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-700" />
                  Work Experience
                </h3>
                <div className="mt-4 space-y-6">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-4 pb-2">
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                      <p className="mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-700" />
                  Education
                </h3>
                <div className="mt-4 space-y-6">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-500 pl-4 pb-2">
                      <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">Graduated: {formatDate(edu.graduationDate)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Key Qualifications</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800">Sales Experience</h4>
                    <p>{candidate.salesExperience}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-800">International Experience</h4>
                    <p>{candidate.internationalExperience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <a 
            href={candidate.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Download Original CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;