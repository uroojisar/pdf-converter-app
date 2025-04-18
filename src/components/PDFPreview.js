import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PDFGenerator.css';

const PDFPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfUrl = location.state?.pdfUrl;

  if (!pdfUrl) {
    // If no PDF passed, return to upload page
    navigate('/');
    return null;
  }

  return (
         <main className="pdf-preview">
        <h3>Preview PDF</h3>
        <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />
        <button className="pdf-back-btn" onClick={() => navigate('/')}>← Back</button>
      </main>
  );
};

export default PDFPreview;
