import React, { useState } from 'react';
import './PDFGenerator.css';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="pdf-header">
      <div className="pdf-header-content">
      <a href="/" className="logo-title">QuickPDF</a>

        <nav className="nav-menu">
          <a href="#" className="nav-link">Tools</a>
          <a href="#" className="nav-link">About</a>
        </nav>

        <button className="menu-toggle" onClick={() => setOpen(!open)}>☰</button>

        {open && (
          <div className="dropdown">
            <a href="#">Tools</a>
            <a href="#">About</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
