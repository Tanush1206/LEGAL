import React from 'react';
import { MessageSquare, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export const ClauseExplanation = ({ document, selectedClause, onClauseSelect }) => {
  const clauses = [
    {
      text: "Payment is due within 30 days of invoice date.",
      explanation: "This is pretty standard - you get a month to pay after they send you a bill. Most businesses work this way, so nothing unusual here.",
      risk: "low",
      section: "Payment Terms",
      tip: "30 days is actually generous - some companies want payment in 15 days or less."
    },
    {
      text: "Either party may terminate this agreement with 30 days written notice.",
      explanation: "Both you and they can end this contract by giving a month's heads up in writing. This gives you flexibility to get out, but also means they could drop you with just 30 days notice.",
      risk: "medium",
      section: "Termination",
      tip: "Make sure you're okay with potentially losing this arrangement on short notice."
    },
    {
      text: "Provider's liability shall not exceed the total amount paid under this agreement.",
      explanation: "If something goes wrong, the most they'll pay you back is what you already paid them. This means if their mistake costs you big money, you might not get fully compensated.",
      risk: "high",
      section: "Liability",
      tip: "This could be a problem if you're depending on them for something critical to your business."
    },
    {
      text: "Both parties agree to keep confidential any proprietary information.",
      explanation: "Standard confidentiality clause - you both promise not to share each other's business secrets with outsiders. This protects both of you.",
      risk: "low",
      section: "Confidentiality",
      tip: "Make sure you know what counts as 'proprietary information' so you don't accidentally violate this."
    }
  ];

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
        Key Clauses Explained
      </h2>
      
      <div className="space-y-4">
        {clauses.map((clause, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedClause === clause.text
                ? 'border-blue-400 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => onClauseSelect(clause.text)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {clause.section}
              </span>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(clause.risk)}`}>
                {getRiskIcon(clause.risk)}
                <span className="capitalize">{clause.risk} Risk</span>
              </div>
            </div>
            
            <p className="text-gray-900 font-medium mb-2 leading-relaxed">
              "{clause.text}"
            </p>
            
            {selectedClause === clause.text && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">What this actually means:</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {clause.explanation}
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> {clause.tip}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Quick tip:</strong> Click any clause above to get a plain-English explanation. 
          The risk levels help you spot the stuff that might need a closer look or legal review.
        </p>
      </div>
    </div>
  );
};