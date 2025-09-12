import React from 'react';
import { Scale, User, LogOut } from 'lucide-react';

export const Navigation = ({ currentPage, setCurrentPage, user, onLogin, onLogout }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Scale className="h-7 w-7 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-800">LegalHelper</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('faq')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'faq'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Hey, {user.name}!</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};