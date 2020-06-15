import React from 'react';
import './StaffDetails.css';
import Header from '../Header';
import LeftNav from '../LeftNav';

function Calender() {
  return (
    <div className="calenderContainer">
      <Header title={"Calender"}/>
      <div className="horizontalLine"></div>
	  <div className="astaff">
      	<LeftNav page={"calender"}/>
      </div>
    </div>
  );
}

export default Calender;
