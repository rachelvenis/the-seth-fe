import React from 'react';
import './StaffDetails.css';
// import AddStaff from './Components/AddStaff';

function LeftNav() {
  return (
    <div className="leftnav">
    	<div className="horizontalLine"></div>
    	<div className="navContainer">
    		<div className="pageOptionContainer">
    			<div className="navOptions">Calendar</div>
    			<div className="navOptions">Staff<br />Details</div>
    			<div className="navOptions">New<br />Assignments</div>
    		</div>
    		<div className="verticalLine"></div>
    	</div>
    </div>
  );
}

export default LeftNav;
