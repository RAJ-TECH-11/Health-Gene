import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';

const VCFUploader = ({ onFileSelect, onValidationError, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file) => {
    // Check file extension
    const validExtensions = ['.vcf', '.txt'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      return 'Please upload a VCF file (.vcf or .txt extension)';
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    // Check if file is empty
    if (file.size === 0) {
      return 'File is empty';
    }

    return null; // No validation error
  };

  const handleFile = useCallback((file) => {
    if (isLoading) return;

    // Debug: Log file details
    console.log('File received:', file);
    console.log('File size:', file.size);
    console.log('File name:', file.name);

    // Validate file
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      onValidationError?.(error);
      return;
    }

    setValidationError('');
    setFile(file);
    onFileSelect?.(file);

    // Simulate upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  }, [isLoading, onFileSelect, onValidationError]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const removeFile = useCallback(() => {
    setFile(null);
    setValidationError('');
    setUploadProgress(0);
    onFileSelect?.(null);
  }, [onFileSelect]);

  const clearError = useCallback(() => {
    setValidationError('');
    onValidationError?.('');
  }, [onValidationError]);

  return (
    <div className="w-full space-y-4 animate-fade-in-up">
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-accent-light" />
          <span>Upload VCF File</span>
        </label>
        
        {/* Drag and Drop Area */}
        <div
          className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'glass bg-white/15 border-accent-light scale-105 shadow-glow'
              : 'glass border border-white/10 hover:border-accent-light/50'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer group'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isLoading && document.getElementById('vcf-file-input').click()}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <input
            id="vcf-file-input"
            type="file"
            accept=".vcf,.txt"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoading}
          />
          
          <div className="relative z-10">
            {file ? (
              <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
                <div className="p-3 rounded-full bg-gradient-to-r from-accent/20 to-accent-dark/20 border border-success/30">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {(() => {
                      if (!file.size) return '0.00 MB';
                      const sizeInMB = file.size / 1024 / 1024;
                      return `${sizeInMB.toFixed(2)} MB`;
                    })()}
                  </p>
                </div>
                {uploadProgress < 100 && (
                  <div className="w-full max-w-xs">
                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-dark rounded-full shadow-glow transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 font-medium">{uploadProgress}%</p>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="mt-2 px-4 py-1.5 text-xs font-medium bg-danger/20 text-danger hover:bg-danger/40 rounded-lg transition-all duration-200"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-accent-light/20 group-hover:border-accent-light/40 transition-all">
                  <Upload className={`w-8 h-8 text-accent-light transition-transform duration-300 ${isDragging ? 'scale-125 animate-bounce' : 'group-hover:scale-110'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                    {isDragging ? '📥 Drop your VCF file here' : 'Drag and drop your VCF file'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse your computer</p>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Supported: .vcf, .txt (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mt-3 glass p-3 border border-danger/30 bg-danger/10 rounded-xl flex items-start space-x-3 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-danger font-medium">{validationError}</p>
            </div>
            <button
              onClick={clearError}
              className="text-danger/70 hover:text-danger transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {file && !validationError && uploadProgress === 100 && (
          <div className="mt-3 glass p-3 border border-success/30 bg-success/10 rounded-xl flex items-center space-x-3 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-sm text-success font-medium">
              File uploaded successfully. Ready for analysis.
            </p>
          </div>
        )}
      </div>

      {/* File Format Info */}
      <div className="glass p-4 rounded-xl border border-accent-light/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-accent-light/10">
            <FileText className="w-4 h-4 text-accent-light flex-shrink-0" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-100 mb-2">VCF File Requirements</p>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li className="flex items-start space-x-2">
                <span className="text-accent-light mt-1">•</span>
                <span>Standard VCF format with header lines starting with #</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-light mt-1">•</span>
                <span>Contains variant information (CHROM, POS, ID, REF, ALT)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-light mt-1">•</span>
                <span>Optional: INFO field with GENE and RSID annotations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-light mt-1">•</span>
                <span>Maximum file size: 10MB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCFUploader;
