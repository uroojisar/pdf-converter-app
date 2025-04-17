import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFGenerator from './components/PDFGenerator';
import PDFPreview from './components/PDFPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PDFGenerator />} />
        <Route path="/preview" element={<PDFPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
