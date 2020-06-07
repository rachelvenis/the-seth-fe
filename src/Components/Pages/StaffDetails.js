import React from 'react';
import './StaffDetails.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
// import AddStaff from './Components/AddStaff';

function StaffDetails() {
  return (
    <div className="leftnav">
      <Header />
      <LeftNav page={"staff"}/>
    </div>
  );
}

export default StaffDetails;
