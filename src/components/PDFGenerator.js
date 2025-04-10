import React from "react";
import jsPDF from "jspdf";

const PDFGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("demo.pdf");
  };

  return (
    <div className="pdf-generator">
      <h2>PDF Generator</h2>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default PDFGenerator;
