import React from 'react';
import { formatDate, getInitials } from '../lib/utils';
import { Candidate } from '../types';
import { Phone, Mail, Star, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onStatusChange: (id: string, status: Candidate['status']) => void;
  onViewResume: (candidate: Candidate) => void;
  onSendWhatsApp: (phone: string) => void;
  onSendEmail: (email: string) => void;
}

const statusIcons = {
  'new': <Clock className="h-4 w-4 text-blue-500" />,
  'yet-to-review': <Clock className="h-4 w-4 text-gray-500" />,
  'reviewed': <CheckCircle className="h-4 w-4 text-green-500" />,
  'shortlisted': <Star className="h-4 w-4 text-yellow-500" />,
  'not-suitable-role': <XCircle className="h-4 w-4 text-red-500" />,
  'not-suitable-any': <XCircle className="h-4 w-4 text-red-700" />,
  'potential-star': <Star className="h-4 w-4 text-purple-500" />
};

const statusLabels = {
  'new': 'New',
  'yet-to-review': 'Yet to Review',
  'reviewed': 'Reviewed',
  'shortlisted': 'Shortlisted',
  'not-suitable-role': 'Not Suitable (Role)',
  'not-suitable-any': 'Not Suitable (Any)',
  'potential-star': 'Potential Star'
};

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onStatusChange,
  onViewResume,
  onSendWhatsApp,
  onSendEmail
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleStatusChange = (status: Candidate['status']) => {
    onStatusChange(candidate.id, status);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              {getInitials(candidate.name)}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                {statusIcons[candidate.status]}
                <span className="ml-1">{statusLabels[candidate.status]}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(candidate.uploadDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-semibold">
              {candidate.score}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs font-medium text-gray-500">Sales Experience</p>
            <p className="text-sm">{candidate.salesExperience}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs font-medium text-gray-500">International Experience</p>
            <p className="text-sm">{candidate.internationalExperience}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-gray-500">Skills</p>
          <div className="mt-1 flex flex-wrap gap-1">
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
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex justify-between">
        <div className="flex space-x-2">
          <button 
            onClick={() => onSendWhatsApp(candidate.phone)}
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Phone className="h-4 w-4 mr-1" />
            WhatsApp
          </button>
          <button 
            onClick={() => onSendEmail(candidate.email)}
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onViewResume(candidate)}
            className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View CV
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Status
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status as Candidate['status'])}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      role="menuitem"
                    >
                      {statusIcons[status as Candidate['status']]}
                      <span className="ml-2">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;