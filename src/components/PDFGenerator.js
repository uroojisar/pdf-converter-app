import React, { useState } from 'react';
import './PDFGenerator.css';
import jsPDF from 'jspdf';


const PDFGenerator = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    generatePdf(selectedFile);
  };

  const generatePdf = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const pdf = new jsPDF();

      // Assuming image file, you can also handle text/html files here
      if (file.type.includes('image')) {
        const imgData = reader.result;
        pdf.addImage(imgData, 'JPEG', 10, 10, 180, 160); // Adjust image size and position
        const pdfOutput = pdf.output('bloburl');
        setPdfUrl(pdfOutput); // Set the generated PDF URL
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
            <a href="#tools" className="nav-link">🧰 Tools</a>
            <a href="#about" className="nav-link">🧭 About</a>
          </nav>
        </div>
      </header>

      <main className="pdf-main-layout">
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
        {/* Preview Section */}
        {pdfUrl && (
          <div className="pdf-preview">
            <h3>Preview PDF</h3>
            <iframe src={pdfUrl} width="100%" height="500px" title="PDF Preview" />
          </div>
        )}
      </main>

      <footer className="pdf-footer">
        © 2025 QuickPDF — All rights reserved.
      </footer>
    </div>
  );
};

export default PDFGenerator;
