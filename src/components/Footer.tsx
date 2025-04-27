
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} SkinVisionAid. 
        All rights reserved. For educational purposes only.
      </p>
      <p className="mt-1">
        Not intended to provide medical advice or replace consultation with healthcare professionals.
      </p>
      <p className="mt-1 text-xs">
        Model accuracy: ~92.5% on test data. Based on research from International Skin Imaging Collaboration.
      </p>
    </footer>
  );
};

export default Footer;
