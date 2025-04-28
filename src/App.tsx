import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import CoursesCatalog from './pages/CoursesCatalog';
import Community from './pages/Community';

function App() {
  // Mock authenticated state - in a real app, this would come from Supabase auth
  const isAuthenticated = true;
  const user = {
    username: 'Miguel',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
  };
  
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar isAuthenticated={isAuthenticated} user={user} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<CoursesCatalog />} />
              <Route path="/community" element={<Community />} />
              {/* Additional routes would be added here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;