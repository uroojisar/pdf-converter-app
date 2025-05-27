import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import * as mammoth from 'mammoth';
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

    if (file.type.includes('image')) {
      reader.onload = () => {
        const pdf = new jsPDF();
        pdf.addImage(reader.result, 'JPEG', 10, 10, 180, 160);
        const blobUrl = pdf.output('bloburl');
        navigate('/preview', { state: { pdfUrl: blobUrl } });
      };
      reader.readAsDataURL(file);
    } else if (file.name.endsWith('.docx')) {
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const html = result.value;

          const container = document.createElement('div');
          container.innerHTML = html;
          document.body.appendChild(container);

          html2pdf()
            .from(container)
            .outputPdf('bloburl')
            .then((blobUrl) => {
              document.body.removeChild(container);
              navigate('/preview', { state: { pdfUrl: blobUrl } });
            });
        } catch (err) {
          console.error('Error converting DOCX to PDF:', err);
          alert('Failed to convert .docx file.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file type. Please upload a JPG, PNG, or DOCX file.');
    }
  };

  return (
    <main className="pdf-container">
      <div className="pdf-box">
        <h2 className="pdf-heading">Easily convert files to PDF in seconds</h2>
        <label className="pdf-file-label">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.docx"
            onChange={handleFileChange}
            className="pdf-file-input"
          />
          Choose File
        </label>
      </div>
    </main>
  );
};

export default PDFGenerator;
