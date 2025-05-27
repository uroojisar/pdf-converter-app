import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PDFGenerator.css';

const PDFPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfUrl = location.state?.pdfUrl;
  const [loading, setLoading] = useState(true);

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    if (!pdfUrl) navigate('/');
  }, [pdfUrl, navigate]);

  // Optional: fallback timeout to remove spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pdf-preview">
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading preview...</p>
        </div>
      )}

      {!isMobile ? (
        <><iframe
          src={pdfUrl}
          title="PDF Preview"
          className="pdf-frame"
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }} /><div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a href={pdfUrl} download="converted.pdf" className="download-link">
              📥 Download PDF
            </a>
          </div></>
      ) : (
        <div className="mobile-download">
          <p>PDF preview not supported on this device. Please download:</p>
          <a href={pdfUrl} download="converted.pdf" className="download-link">
            📥 Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
