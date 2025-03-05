import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, XCircle, File as FileIcon } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for only PDF and Word documents
    const validFiles = acceptedFiles.filter(file => {
      const isValid = 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      return isValid;
    });

    if (validFiles.length !== acceptedFiles.length) {
      setErrorMessage('Some files were rejected. Only PDF and Word documents are accepted.');
    } else {
      setErrorMessage(null);
    }

    if (validFiles.length > 0) {
      setUploadedFiles(validFiles);
      setUploadStatus('success');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB max file size
    onDropRejected: (fileRejections) => {
      const errors = fileRejections.map(rejection => {
        if (rejection.errors[0].code === 'file-too-large') {
          return `${rejection.file.name} is too large. Max size is 10MB.`;
        }
        if (rejection.errors[0].code === 'file-invalid-type') {
          return `${rejection.file.name} is not a supported file type.`;
        }
        return `${rejection.file.name} was rejected: ${rejection.errors[0].message}`;
      });
      
      setErrorMessage(errors.join(' '));
      setUploadStatus('error');
    }
  });

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      onUploadComplete(uploadedFiles);
    }
  };

  const resetUpload = () => {
    setUploadedFiles([]);
    setUploadStatus('idle');
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {uploadStatus === 'idle' ? (
        <>
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700">
              {isDragActive ? 'Drop the files here' : 'Drag & drop resume files here'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              or click to browse files
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX (Max 10MB)
            </p>
          </div>
          
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}
        </>
      ) : uploadStatus === 'success' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Files Ready to Process</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mb-6 max-h-60 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center p-3">
                <FileIcon className="h-5 w-5 text-blue-500 mr-3" />
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleUpload}
              className="flex-grow px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Process {uploadedFiles.length} {uploadedFiles.length === 1 ? 'File' : 'Files'}
            </button>
            <button
              onClick={resetUpload}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Upload Failed</h3>
          <p className="text-gray-600 mt-2">
            {errorMessage || 'There was an error uploading your files. Please try again.'}
          </p>
          <button
            onClick={resetUpload}
            className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;