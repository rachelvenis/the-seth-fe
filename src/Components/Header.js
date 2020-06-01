import React from 'react';
import the_seth_logo from '../the-seth-logo.png';
// import './Header.css';
// import AddStaff from './Components/AddStaff';

function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
          <img src={the_seth_logo} alt="logo" className="logo"/>
      </div>
    </div>
  );
}

export default Header;
