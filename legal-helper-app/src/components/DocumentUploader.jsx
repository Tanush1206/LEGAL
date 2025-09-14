// File: src/components/DocumentUploader.jsx

import React, { useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export const DocumentUploader = ({ onDocumentUpload, onClausesExtracted }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

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
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
      setError("File size too large. Please upload a file smaller than 2MB.");
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const documentContent = e.target.result;
      try {
        // Process summary first
        console.log('🔄 Starting document summary processing...');
        const summaryResponse = await fetch(API_ENDPOINTS.SIMPLIFY_TEXT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentContent }),
        });

        if (!summaryResponse.ok) {
          throw new Error('Summary processing failed');
        }

        const summaryData = await summaryResponse.json();
        onDocumentUpload(summaryData.summary);
        console.log('✅ Summary processing complete');

        // Wait a moment before processing clauses
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Process clauses second
        console.log('🔄 Starting clause extraction...');
        const clausesResponse = await fetch(API_ENDPOINTS.EXTRACT_CLAUSES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentContent }),
        });

        if (!clausesResponse.ok) {
          throw new Error('Clause extraction failed');
        }

        const clausesData = await clausesResponse.json();
        onClausesExtracted(clausesData.clauses);
        console.log('✅ Clause extraction complete');
      } catch (err) {
        console.error("API call failed:", err);
        setError("Failed to process document. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read file.");
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setError(null);
    onDocumentUpload(null);
    onClausesExtracted(null);
  };

  // ... (rest of the component remains the same)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Upload a Document</h2>
      <p className="text-gray-600">
        Drop your legal document here or click to upload.
      </p>

      {!uploadedFile ? (
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="h-10 w-10 mx-auto text-blue-500" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Drag and drop or <span className="text-blue-600">browse</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF, DOCX, or TXT up to 2MB
            </p>
          </div>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept=".pdf,.docx,.txt"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>
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
          ) : error ? (
            <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Document processed! Summary ready.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};