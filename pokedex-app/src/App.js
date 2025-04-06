import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './i18n';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;