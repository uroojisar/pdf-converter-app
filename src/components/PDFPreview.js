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
    <div className="pdf-app">
      <header className="pdf-header">
        <div className="pdf-header-content">
          <div className="logo-title">
            <span className="logo">📄⚡</span> QuickPDF
          </div>
        </div>
      </header>

      <main className="pdf-preview">
        <h3>Preview PDF</h3>
        <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />
        <button className="pdf-back-btn" onClick={() => navigate('/')}>← Back</button>
      </main>

      <footer className="pdf-footer">
        © 2025 QuickPDF — All rights reserved.
      </footer>
    </div>
  );
};

export default PDFPreview;
