import React from 'react';
import './LeftNav.css';
// import AddStaff from './Components/AddStaff';

function LeftNav() {
  return (
    <div className="leftnav">
    	<div className="horizontalLine"></div>
    	<div className="navContainer">
    		<div className="pageOptionContainer">
    			<div className="navOptions">opt 1</div>
    			<div className="navOptions">opt 2</div>
    			<div className="navOptions">opt 3</div>
    		</div>
    		<div className="verticalLine"></div>
    	</div>
    </div>
  );
}

export default LeftNav;
