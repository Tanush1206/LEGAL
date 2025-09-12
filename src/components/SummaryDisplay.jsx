import React from 'react';
import { FileText, Clock, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

export const SummaryDisplay = ({ summary }) => {
  const keyPoints = [
    {
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      title: "Payment",
      description: "30 days to pay invoices",
      status: "standard"
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      title: "Termination",
      description: "Either party can end with 30 days notice",
      status: "flexible"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      title: "Liability",
      description: "Limited to amount you've already paid",
      status: "watch-out"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'standard': return 'bg-green-50 border-green-200';
      case 'flexible': return 'bg-blue-50 border-blue-200';
      case 'watch-out': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Document Summary
      </h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 mb-3">The Main Points:</h3>
        
        {keyPoints.map((point, index) => (
          <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg border ${getStatusColor(point.status)}`}>
            <div className="flex-shrink-0 mt-0.5">
              {point.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{point.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{point.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Just a heads up</p>
            <p className="text-sm text-yellow-700 mt-1">
              This is an AI-generated summary to help you understand the document better. 
              For important legal decisions, it's always smart to run things by a real lawyer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};