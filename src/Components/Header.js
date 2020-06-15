import React, { Component } from 'react';
import the_seth_logo from '../the-seth-logo.png';
// import './Header.css';

class Header extends Component {
  render() {
	  return (
	    <div className="header">
	      <div className="logo-wrapper">
	          <img src={the_seth_logo} alt="logo" className="logo"/>
	      </div>
	      <div>{this.props.title}</div>
	    </div>
	  );
	}
}

export default Header;
