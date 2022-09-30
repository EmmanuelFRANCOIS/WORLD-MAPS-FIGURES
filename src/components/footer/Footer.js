import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <Navbar className="d-flex justify-content-between align-items-center flex-wrap px-4 py-2 bg-secondary text-white pageFooter">
      <div></div>
      <div className="text-light">Copyright © 2022 Emmanuel FRANCOIS. All rights reserved.</div>
    </Navbar>
  );
};

export default Footer;