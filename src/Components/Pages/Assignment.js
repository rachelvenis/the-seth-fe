import React from 'react';
import './StaffDetails.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
// import AddStaff from './Components/AddStaff';

function Assignment() {
  return (
    <div className="leftnav">
      <Header />
      <LeftNav page={"assignment"}/>
    </div>
  );
}

export default Assignment;
