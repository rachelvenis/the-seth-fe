import React, { Component } from 'react';
import './LeftNav.css';
import { Link } from "react-router-dom";

class LeftNav extends Component {
  render() {
    return (
      <div className="leftnav">
        <div className="navContainer">
          <div className="pageOptionContainer">
            <Link to="/calender" style={{ textDecoration: 'none', color: 'black' }}>
              <div
                className={`navOptions ${this.props.page === "calender" ? 'selected' : null}`}>
                Calendar
              </div>
            </Link>
            <Link to="/staff" style={{ textDecoration: 'none', color: 'black' }}>
              <div
                className={`navOptions ${this.props.page === "staff" ? 'selected' : null}`}>
                Staff<br />Details
              </div>
            </Link>
            <Link to="/assignment" style={{ textDecoration: 'none', color: 'black' }}>
              <div
                className={`navOptions ${this.props.page === "assignment" ? 'selected' : null}`}>
                New<br />Assignments
              </div>
            </Link>
          </div>
          <div className="verticalLine"></div>
        </div>
      </div>
    );
  }
}

export default LeftNav;
