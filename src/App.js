import React from 'react';
import the_seth_logo from './the-seth-logo.png';
import './App.css';
import AddStaff from './Components/AddStaff';

function App() {
  return (
    <div>
      <div className="header">
        <div className="logo-wrapper">
            <img src={the_seth_logo} alt="logo" className="logo"/>
        </div>
      </div>
      <div className="add-staff-wrapper">
        <AddStaff />
      </div>
    </div>
  );
}

export default App;
