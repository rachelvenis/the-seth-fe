import React from 'react';
import './StaffDetails.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
// import AddStaff from './Components/AddStaff';

function Calender() {
  return (
    <div className="leftnav">
      <Header />
      <LeftNav page={"calender"}/>
    </div>
  );
}

export default Calender;
