import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './PDFGenerator.css';

const PDFGenerator = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    generatePdf(selectedFile);
  };

  const generatePdf = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const pdf = new jsPDF();
      if (file.type.includes('image')) {
        pdf.addImage(reader.result, 'JPEG', 10, 10, 180, 160);
        const blobUrl = pdf.output('bloburl');

        // Navigate to /preview and pass URL via state
        navigate('/preview', { state: { pdfUrl: blobUrl } });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pdf-app">
      <header className="pdf-header">
        <div className="pdf-header-content">
          <div className="logo-title">
            <span className="logo">📄⚡</span> QuickPDF
          </div>
          <nav className="nav-menu">
            <a href="#tools" className="nav-link">Tools</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main className="pdf-container">
        <div className="pdf-box">
          <h2 className="pdf-heading">Easily convert files to PDF in seconds</h2>
          <label className="pdf-file-label">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.html,.htm,.doc,.docx"
              onChange={handleFileChange}
              className="pdf-file-input"
            />
            Choose File
          </label>
        </div>
      </main>

      <footer className="pdf-footer">
        © 2025 QuickPDF — All rights reserved.
      </footer>
    </div>
  );
};

export default PDFGenerator;
