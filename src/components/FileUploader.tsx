import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for only PDF and DOC/DOCX files
    const validFiles = acceptedFiles.filter(file => {
      const type = file.type;
      return type === 'application/pdf' || 
             type === 'application/msword' || 
             type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    });
    
    setFiles(validFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadStatus('success');
      onUploadComplete(files);
    }, 2000);
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadStatus('idle');
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
              or click to select files
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                    <File className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm truncate flex-1">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {files.length} {files.length === 1 ? 'file' : 'files'}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : uploadStatus === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Upload Successful!</h3>
          <p className="text-gray-600 mt-2">
            {files.length} {files.length === 1 ? 'resume' : 'resumes'} uploaded successfully.
          </p>
          <button
            onClick={resetUpload}
            className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload More Files
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800">Upload Failed</h3>
          <p className="text-gray-600 mt-2">
            There was an error uploading your files. Please try again.
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