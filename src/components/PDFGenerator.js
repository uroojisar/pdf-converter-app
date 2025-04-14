import React, { useState } from "react";
import jsPDF from "jspdf";
import "./PDFGenerator.css";

const PDFGenerator = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      const type = uploadedFile.type;
      setFile(uploadedFile);

      if (type.startsWith("image/")) {
        convertImageToPDF(uploadedFile);
      } else if (type === "text/html") {
        alert("HTML to PDF coming soon!");
      } else if (
        type === "application/msword" ||
        type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        alert("Word to PDF coming soon!");
      } else {
        alert("Unsupported file type.");
      }
    }
  };

  const convertImageToPDF = (imageFile) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgData = e.target.result;
      const img = new Image();

      img.onload = function () {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const pageWidth = imgWidth * 0.264583;
        const pageHeight = imgHeight * 0.264583;

        const doc = new jsPDF({
          orientation: pageWidth > pageHeight ? "l" : "p",
          unit: "mm",
          format: [pageWidth, pageHeight],
        });

        doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
        doc.save("converted.pdf");
      };

      img.src = imgData;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="pdf-app">
      <header className="pdf-header">
  <div className="pdf-header-content">
    <div className="logo-title">
      <span className="logo">📄⚡</span> QuickPDF
    </div>
    <nav className="nav-menu">
      <a href="#tools" className="nav-link">🛠️ Tools</a>
      <a href="#about" className="nav-link">ℹ️ About</a>
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
