import React from 'react';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

export const SummaryDisplay = ({ summary }) => {
  // Function to parse summary into meaningful bullet points
  const parseSummaryToPoints = (summaryText) => {
    if (!summaryText) return [];
    
    // First, try to split by paragraphs (double newlines)
    let points = summaryText
      .split(/\n\s*\n/) // Split by double newlines (paragraphs)
      .map(point => point.trim())
      .filter(point => point.length > 20); // Keep meaningful paragraphs
    
    // If no paragraphs found, try to split by single newlines but keep longer content
    if (points.length <= 1) {
      points = summaryText
        .split(/\n/) // Split by single newlines
        .map(point => point.trim())
        .filter(point => point.length > 30); // Keep longer lines
    }
    
    // If still no good splits, try to split by sentences but keep them together
    if (points.length <= 1) {
      const sentences = summaryText
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 20);
      
      // Group sentences into meaningful points (2-3 sentences per point)
      points = [];
      for (let i = 0; i < sentences.length; i += 2) {
        const point = sentences.slice(i, i + 2).join('. ').trim();
        if (point.length > 30) {
          points.push(point + (point.endsWith('.') ? '' : '.'));
        }
      }
    }
    
    // If we still have very few points, try splitting by common separators but keep content longer
    if (points.length <= 1) {
      points = summaryText
        .split(/[•\-\*]+/) // Split by bullet points, dashes, asterisks
        .map(point => point.trim())
        .filter(point => point.length > 40) // Keep longer content
        .slice(0, 6); // Limit to 6 points
    }
    
    // Final fallback: if we have very long content, split it into chunks
    if (points.length <= 1 && summaryText.length > 200) {
      const chunkSize = Math.ceil(summaryText.length / 4); // Split into 4 chunks
      points = [];
      for (let i = 0; i < summaryText.length; i += chunkSize) {
        const chunk = summaryText.slice(i, i + chunkSize).trim();
        if (chunk.length > 50) {
          points.push(chunk);
        }
      }
    }
    
    return points.length > 0 ? points : [summaryText]; // Fallback to original text
  };

  const summaryPoints = parseSummaryToPoints(summary);
  
  // Debug: Log the parsing results
  console.log('Original summary:', summary);
  console.log('Parsed points:', summaryPoints);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        Document Summary
      </h2>
      
      <div className="space-y-4">
        {summaryPoints.length > 0 ? (
          summaryPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  {point}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">
              {summary}
            </p>
          </div>
        )}
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