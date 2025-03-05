import React, { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { mockCandidates } from '../data/mockData';
import { Users, FileText, Star, Clock, CheckCircle, XCircle } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Calculate statistics
  const totalCandidates = mockCandidates.length;
  const newCandidates = mockCandidates.filter(c => c.status === 'new').length;
  const shortlistedCandidates = mockCandidates.filter(c => c.status === 'shortlisted').length;
  const reviewedCandidates = mockCandidates.filter(c => c.status === 'reviewed').length;
  
  // Calculate average score
  const averageScore = mockCandidates.reduce((sum, candidate) => sum + candidate.score, 0) / totalCandidates;
  
  // Data for status distribution chart
  const statusData = useMemo(() => ({
    labels: ['New', 'Yet to Review', 'Reviewed', 'Shortlisted', 'Not Suitable (Role)', 'Not Suitable (Any)', 'Potential Star'],
    datasets: [
      {
        data: [
          mockCandidates.filter(c => c.status === 'new').length,
          mockCandidates.filter(c => c.status === 'yet-to-review').length,
          mockCandidates.filter(c => c.status === 'reviewed').length,
          mockCandidates.filter(c => c.status === 'shortlisted').length,
          mockCandidates.filter(c => c.status === 'not-suitable-role').length,
          mockCandidates.filter(c => c.status === 'not-suitable-any').length,
          mockCandidates.filter(c => c.status === 'potential-star').length,
        ],
        backgroundColor: [
          '#3b82f6', // blue
          '#9ca3af', // gray
          '#10b981', // green
          '#f59e0b', // yellow
          '#ef4444', // red
          '#7f1d1d', // dark red
          '#8b5cf6', // purple
        ],
        borderWidth: 0,
      },
    ],
  }), [mockCandidates]);
  
  // Data for score distribution chart
  const scoreRanges = ['0-50', '51-70', '71-80', '81-90', '91-100'];
  const scoreDistribution = [
    mockCandidates.filter(c => c.score <= 50).length,
    mockCandidates.filter(c => c.score > 50 && c.score <= 70).length,
    mockCandidates.filter(c => c.score > 70 && c.score <= 80).length,
    mockCandidates.filter(c => c.score > 80 && c.score <= 90).length,
    mockCandidates.filter(c => c.score > 90).length,
  ];
  
  const scoreData = {
    labels: scoreRanges,
    datasets: [
      {
        label: 'Candidates',
        data: scoreDistribution,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Candidates</p>
              <p className="text-2xl font-semibold">{totalCandidates}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Star className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Shortlisted</p>
              <p className="text-2xl font-semibold">{shortlistedCandidates}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Today</p>
              <p className="text-2xl font-semibold">{newCandidates}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Score</p>
              <p className="text-2xl font-semibold">{averageScore.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Candidate Status Distribution</h2>
          <div className="h-64">
            <Doughnut 
              data={statusData} 
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          <div className="h-64">
            <Bar 
              data={scoreData} 
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Candidates',
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Score Range',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mt-1">
              <FileText className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">5 new resumes uploaded</p>
              <p className="text-xs text-gray-500">Today at 10:30 AM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mt-1">
              <Star className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Sipho Nkosi was shortlisted for Sales Representative position</p>
              <p className="text-xs text-gray-500">Today at 9:15 AM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mt-1">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">New job description created: Customer Service Agent - Inbound</p>
              <p className="text-xs text-gray-500">Yesterday at 4:45 PM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-red-100 text-red-600 mt-1">
              <XCircle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Mandla Zulu marked as not suitable for Sales Representative role</p>
              <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;