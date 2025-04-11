import React, { useState } from "react";
import jsPDF from "jspdf";

const PDFGenerator = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");

  // Handle file input and detect type
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const type = uploadedFile.type;

      setFile(uploadedFile);

      if (type.startsWith("image/")) {
        setFileType("image");
      } else if (type === "text/html") {
        setFileType("html");
      } else if (
        type === "application/msword" ||
        type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFileType("doc");
      } else {
        alert("Unsupported file type");
        setFile(null);
        setFileType("");
      }
    }
  };

  // Image to PDF logic only (for now)
  const generatePDF = () => {
    if (!file) return alert("Please upload a file");

    if (fileType === "image") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;
        const img = new Image();

        img.onload = function () {
          const imgWidth = img.width;
          const imgHeight = img.height;

          const pageWidth = imgWidth * 0.264583; // px to mm
          const pageHeight = imgHeight * 0.264583;

          const doc = new jsPDF({
            orientation: pageWidth > pageHeight ? "l" : "p",
            unit: "mm",
            format: [pageWidth, pageHeight],
          });

          doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
          doc.save("image-converted.pdf");
        };

        img.src = imgData;
      };
      reader.readAsDataURL(file);
    } else {
      alert(`Conversion for "${fileType}" is coming soon!`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Multi-File to PDF Converter</h2>

      <input
        type="file"
        accept=".jpg,.jpeg,.png,.html,.htm,.doc,.docx"
        onChange={handleFileChange}
      />

      <br /><br />

      <button onClick={generatePDF} disabled={!file}>
        Convert & Download PDF
      </button>
    </div>
  );
};

export default PDFGenerator;
