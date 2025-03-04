import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [processedCount, setProcessedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleUploadComplete = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setTotalCount(uploadedFiles.length);
    setProcessedCount(0);
    setProcessingStatus('processing');
    
    // Simulate processing of files
    let processed = 0;
    const interval = setInterval(() => {
      processed += 1;
      setProcessedCount(processed);
      
      if (processed >= uploadedFiles.length) {
        clearInterval(interval);
        setProcessingStatus('complete');
      }
    }, 1000); // Process one file per second (simulation)
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload Resumes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FileUploader onUploadComplete={handleUploadComplete} />
        </div>
        
        <div>
          {processingStatus === 'idle' ? (
            <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="p-6 rounded-full bg-blue-50 mb-4">
                <ArrowRight className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Upload Resumes to Begin</h3>
              <p className="text-gray-600">
                Upload PDF or Word documents containing candidate resumes. 
                The system will automatically extract relevant information.
              </p>
            </div>
          ) : processingStatus === 'processing' ? (
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Processing Resumes</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{processedCount} of {totalCount} files</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(processedCount / totalCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="font-medium">Extracting data from resumes</p>
                    <p className="text-sm text-gray-500">Analyzing text and structure</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-800">1</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">Extracting contact information</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-800">2</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">Identifying work experience</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-800">3</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">Extracting skills and qualifications</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-800">4</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">Calculating match scores</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="text-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800">Processing Complete!</h3>
                <p className="text-gray-600 mt-2">
                  All {totalCount} resumes have been processed successfully.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-green-800 mb-2">Summary</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Total Resumes Processed:</span>
                    <span className="font-medium">{totalCount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>High Match Candidates (80%+):</span>
                    <span className="font-medium">{Math.floor(totalCount * 0.3)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Medium Match Candidates (50-79%):</span>
                    <span className="font-medium">{Math.floor(totalCount * 0.5)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Low Match Candidates (&lt;50%):</span>
                    <span className="font-medium">{Math.floor(totalCount * 0.2)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href="/candidates" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
                >
                  View All Candidates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;