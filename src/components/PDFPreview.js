import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PDFGenerator.css';

const PDFPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfUrl = location.state?.pdfUrl;
  const [loading, setLoading] = useState(true);

  console.log('PDF URL:', pdfUrl);

  if (!pdfUrl) {
    // If no PDF passed, return to upload page
    navigate('/');
    return null;
  }

  return (
      <div className="pdf-preview">
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading preview...</p>
        </div>
      )}
      
      <iframe
        src={pdfUrl}
        title="PDF Preview"
        className="pdf-frame"
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
      <a href={pdfUrl} download="converted.pdf" className="download-link">
  Download PDF
</a>

    </div>
  );
};

export default PDFPreview;
