import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openItems, setOpenItems] = useState([0]); // First item open by default

  const faqItems = [
    {
      question: "How does this actually work?",
      answer: "We use AI to read through your legal documents and translate the complex legal language into plain English. Think of it like having a lawyer friend explain things to you, but faster and available 24/7. The AI has been trained on thousands of legal documents to understand common patterns and clauses."
    },
    {
      question: "What kinds of documents can I upload?",
      answer: "Pretty much any legal document you can think of - contracts, leases, employment agreements, terms of service, NDAs, purchase agreements, you name it. We support PDF, Word documents, and plain text files. If it's got legal text in it, we can probably help make sense of it."
    },
    {
      question: "Is my stuff actually private and secure?",
      answer: "Absolutely. We don't store your documents on our servers - they're processed in real-time and then deleted. All uploads are encrypted, and we follow strict security practices. Your sensitive legal documents never leave our secure processing environment."
    },
    {
      question: "How accurate are these explanations?",
      answer: "Our AI is pretty good at explaining standard legal clauses and terms, but we're not perfect. We always recommend double-checking important stuff with a real lawyer. Think of us as your first line of defense against confusing legal language, not a replacement for professional legal advice."
    },
    {
      question: "Can this help me negotiate better deals?",
      answer: "While we can't give you negotiation advice, understanding what's actually in your contracts definitely puts you in a better position. When you know what clauses mean and which ones might be risky, you can have more informed conversations with lawyers or the other party."
    },
    {
      question: "Are there any limits on file size?",
      answer: "We can handle files up to 10MB, which covers most legal documents. If you've got something bigger, try breaking it into sections or reach out to us - we might be able to help."
    },
    {
      question: "Do I really need to create an account?",
      answer: "Yeah, but it's quick and free. Having an account lets us give you a better experience and keeps your analysis history so you can refer back to documents you've already uploaded."
    },
    {
      question: "What if I find an error in the explanation?",
      answer: "Let us know! We're constantly improving our AI, and feedback helps us get better. If you spot something that doesn't look right, drop us a line and we'll look into it."
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            Got Questions?
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Here are the most common things people ask us about LegalHelper.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
            >
              <h3 className="text-lg font-medium text-gray-900 pr-4">
                {item.question}
              </h3>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-5">
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? We're here to help you out.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Get in Touch
        </button>
      </div>
    </div>
  );
};