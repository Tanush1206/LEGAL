import React from 'react';
import { MessageSquare, AlertTriangle, Info, CheckCircle, Loader2 } from 'lucide-react';

export const ClauseExplanation = ({ clauses, selectedClause, onClauseSelect, isLoading }) => {

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Key Clauses Explained
        </h2>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Analyzing clauses...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!clauses || clauses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Key Clauses Explained
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No clauses found in the document.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
        Key Clauses Explained
      </h2>
      
      <div className="space-y-4">
        {clauses.map((keyPoint, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedClause === keyPoint.explanation
                ? 'border-blue-400 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onClauseSelect(keyPoint.explanation)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {keyPoint.section}
              </span>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(keyPoint.risk)}`}>
                {getRiskIcon(keyPoint.risk)}
                <span className="capitalize">{keyPoint.risk} Risk</span>
              </div>
            </div>
            
            <p className="text-gray-900 font-medium mb-2 leading-relaxed">
              {keyPoint.explanation}
            </p>
            
            {selectedClause === keyPoint.explanation && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Key clauses in this section:</h4>
                <ul className="text-gray-700 leading-relaxed mb-3 space-y-1">
                  {keyPoint.keyClauses && keyPoint.keyClauses.map((clause, clauseIndex) => (
                    <li key={clauseIndex} className="text-sm">• {clause}</li>
                  ))}
                </ul>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> {keyPoint.tip}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Quick tip:</strong> Click any key point above to see the specific clauses and get a plain-English explanation. 
          The risk levels help you spot the stuff that might need a closer look or legal review.
        </p>
      </div>
    </div>
  );
};