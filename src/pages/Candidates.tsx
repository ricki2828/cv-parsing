import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockCandidates } from '../data/mockData';
import { Candidate } from '../types';
import CandidateCard from '../components/CandidateCard';
import ResumeViewer from '../components/ResumeViewer';
import { Search, Filter, SortDesc, SortAsc, Download, Loader2, Users } from 'lucide-react';

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Candidate['status'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        candidate.salesExperience.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.internationalExperience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(candidate => candidate.status === statusFilter);
    }
    
    // Apply sorting
    return result.sort((a, b) => {
      if (sortBy === 'score') {
        return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
      } else {
        return sortOrder === 'asc' 
          ? a.uploadDate.getTime() - b.uploadDate.getTime() 
          : b.uploadDate.getTime() - a.uploadDate.getTime();
      }
    });
  }, [candidates, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleStatusChange = (id: string, status: Candidate['status']) => {
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === id ? { ...candidate, status } : candidate
    );
    setCandidates(updatedCandidates);
  };

  const handleViewResume = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSendWhatsApp = (phone: string) => {
    // In a real app, this would integrate with WhatsApp API
    // For now, we'll just show an alert
    alert(`Sending WhatsApp message to ${phone}`);
  };

  const handleSendEmail = (email: string) => {
    // In a real app, this would integrate with an email service
    // For now, we'll just show an alert
    alert(`Sending email to ${email}`);
  };

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting candidates to CSV...');
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/candidates');
        // const data = await response.json();
        // setCandidates(data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCandidates(mockCandidates);
      } catch (error) {
        console.error('Error loading candidates:', error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCandidates();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <button 
          onClick={handleExportCSV}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search candidates by name, skills, or experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Candidate['status'] | 'all')}
                className="border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 py-2 pl-2 pr-8"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="yet-to-review">Yet to Review</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="not-suitable-role">Not Suitable (Role)</option>
                <option value="not-suitable-any">Not Suitable (Any)</option>
                <option value="potential-star">Potential Star</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => setSortBy('score')}
                className={`px-3 py-2 rounded-md text-sm ${
                  sortBy === 'score' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Score
              </button>
              <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-2 rounded-md text-sm ${
                  sortBy === 'date' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Date
              </button>
              <button
                onClick={toggleSortOrder}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading candidates...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onStatusChange={handleStatusChange}
                onViewResume={handleViewResume}
                onSendWhatsApp={handleSendWhatsApp}
                onSendEmail={handleSendEmail}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No candidates match your search criteria.</p>
            </div>
          )}
        </div>
      )}
      
      {selectedCandidate && (
        <ResumeViewer
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default Candidates;