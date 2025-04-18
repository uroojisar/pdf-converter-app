// src/components/Header.js
import React from 'react';
import './PDFGenerator.css'; // Use the same CSS if shared

const Header = () => {
  return (
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
  );
};

export default Header;
