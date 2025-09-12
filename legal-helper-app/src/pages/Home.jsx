// File: src/pages/Home.jsx
import React, { useState } from 'react';
import { DocumentUploader } from '../components/DocumentUploader';
import { ClauseExplanation } from '../components/ClauseExplanation';
import { SummaryDisplay } from '../components/SummaryDisplay';
import { FileText, Zap, Shield, ArrowRight } from 'lucide-react';

export const Home = ({ user }) => {
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [documentSummary, setDocumentSummary] = useState(null);
  const [extractedClauses, setExtractedClauses] = useState(null);
  const [isLoadingClauses, setIsLoadingClauses] = useState(false);

  const handleDocumentUpload = (content) => {
    setUploadedDocument(content);
    setDocumentSummary(content); // Now, the content is the simplified summary from the backend.
    if (content) {
      setIsLoadingClauses(true);
    }
  };

  const handleClausesExtracted = (clauses) => {
    setExtractedClauses(clauses);
    setIsLoadingClauses(false);
  };

  const handleClauseSelect = (clause) => {
    setSelectedClause(clause);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Getting Lost in <br />
              <span className="text-blue-600">Legal Jargon.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Our AI tool translates complex legal documents into simple, easy-to-understand summaries.
              Get the key facts without the confusion.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg inline-block">
              <span className="text-gray-400">Sign up above to start analyzing documents for free</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${!uploadedDocument ? 'min-h-screen flex items-center justify-center' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Ready to make sense of another legal document? Just upload it below.
            </p>
          </div>

          <div className={`${uploadedDocument ? 'grid lg:grid-cols-2' : 'flex justify-center'} gap-8`}>
            <div className="space-y-6">
              <DocumentUploader 
                onDocumentUpload={handleDocumentUpload} 
                onClausesExtracted={handleClausesExtracted}
              />
              
              {documentSummary && (
                <SummaryDisplay summary={documentSummary} />
              )}
            </div>
            {uploadedDocument && (
              <ClauseExplanation
                clauses={extractedClauses}
                selectedClause={selectedClause}
                onClauseSelect={handleClauseSelect}
                isLoading={isLoadingClauses}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};