import React, { useState } from 'react';
import { Home } from './pages/Home';
import { FAQ } from './pages/FAQ';
import { AuthModal } from './components/AuthModal';
import { Navigation } from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'home') {
      return <Home user={user} />;
    } else if (currentPage === 'faq') {
      return <FAQ />;
    } else {
      return <Home user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {renderCurrentPage()}
      
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;