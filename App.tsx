import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ListView } from './pages/ListView';
import { Detail } from './pages/Detail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Category List Routes */}
        <Route path="/education" element={<Navigate to="/list/education" replace />} />
        <Route path="/experience" element={<Navigate to="/list/experience" replace />} />
        <Route path="/projects" element={<Navigate to="/list/projects" replace />} />
        <Route path="/extracurricular" element={<Navigate to="/list/extracurricular" replace />} />
        <Route path="/awards" element={<Navigate to="/list/awards" replace />} />
        
        <Route path="/list/:category" element={<ListView />} />
        
        {/* Detail Routes */}
        <Route path="/detail/:type/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;