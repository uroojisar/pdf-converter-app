import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFGenerator from './components/PDFGenerator';
import PDFPreview from './components/PDFPreview';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="pdf-app">
      <Header />
    <Router>
      <Routes>
        <Route path="/" element={<PDFGenerator />} />
        <Route path="/preview" element={<PDFPreview />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
