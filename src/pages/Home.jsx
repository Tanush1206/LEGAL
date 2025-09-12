import React, { useState } from 'react';
import { DocumentUploader } from '../components/DocumentUploader';
import { ClauseExplanation } from '../components/ClauseExplanation';
import { SummaryDisplay } from '../components/SummaryDisplay';
import { FileText, Zap, Shield, ArrowRight } from 'lucide-react';

export const Home = ({ user }) => {
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [documentSummary, setDocumentSummary] = useState(null);

  const handleDocumentUpload = (content) => {
    setUploadedDocument(content);
    // Simulate processing time
    setTimeout(() => {
      setDocumentSummary("This looks like a standard service agreement. The main things to know: you have 30 days to pay invoices, either party can end the contract with a month's notice, and there are some liability limitations. Overall, it's pretty straightforward but watch out for the liability clause.");
    }, 1500);
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
              <span className="text-blue-600">Legal Jargon</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload any contract or legal document and get instant explanations in plain English. 
              No law degree required – just upload and understand.
            </p>
            <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
              <span className="text-sm text-gray-500 px-3">👆 Sign in above to get started</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Upload Your Document
                </h3>
                <p className="text-gray-600">
                  Drag and drop any PDF, Word doc, or text file. We support most legal document formats.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2. Get Instant Analysis
                </h3>
                <p className="text-gray-600">
                  Our AI reads through everything and breaks down complex clauses into simple explanations.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Understand & Decide
                </h3>
                <p className="text-gray-600">
                  Know exactly what you're signing with risk assessments and plain-English summaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Decode Your Documents?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of people who've stopped guessing what their contracts actually say.
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
              <DocumentUploader onDocumentUpload={handleDocumentUpload} />
              
              {documentSummary && (
                <SummaryDisplay summary={documentSummary} />
              )}
            </div>
            {uploadedDocument && (
              <ClauseExplanation
                document={uploadedDocument}
                selectedClause={selectedClause}
                onClauseSelect={handleClauseSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};