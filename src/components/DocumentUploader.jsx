import React, { useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

export const DocumentUploader = ({ onDocumentUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsProcessing(true);

    // Mock processing with realistic content
    setTimeout(() => {
      const mockContent = `SERVICE AGREEMENT

This Agreement is made between Company A ("Provider") and Company B ("Client").

1. PAYMENT TERMS
Payment is due within 30 days of invoice date. Late payments may incur a 1.5% monthly fee.

2. TERMINATION
Either party may terminate this agreement with 30 days written notice to the other party.

3. CONFIDENTIALITY
Both parties agree to keep confidential any proprietary information shared during this agreement.

4. LIABILITY LIMITATION
Provider's liability shall not exceed the total amount paid under this agreement. Neither party shall be liable for consequential, indirect, or punitive damages.

5. INTELLECTUAL PROPERTY
All work products created under this agreement shall belong to the Client upon full payment.`;
      
      onDocumentUpload(mockContent);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
  };

  return (
    <div className="mx-auto w-full max-w-xl bg-white rounded-none shadow-lg border border-gray-200 p-12 min-h-[260px]">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Upload Your Document
      </h2>
      
      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-none p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-blue-400 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop your legal document here
          </h3>
          <p className="text-gray-500 mb-6">
            or click below to browse your files
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium cursor-pointer inline-block transition-colors"
          >
            Choose File
          </label>
          <p className="text-xs text-gray-400 mt-4">
            Supports PDF, DOC, DOCX, TXT files up to 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={removeFile}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {isProcessing ? (
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700 font-medium">
                Reading your document... This usually takes a few seconds.
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">
                All done! Check out the analysis below.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};