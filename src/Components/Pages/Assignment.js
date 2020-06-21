import React, { Component } from 'react';
import './Assignment.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
import Dropdown from '../Dropdown';
import InputDaysOff from '../InputDaysOff';

class Assignment extends Component {
  render() {
    return (
      <div className="assignmentContainer">
        <Header title={"New Assignment"}/>
        <div className="horizontalLine"></div>
  	  <div className="astaff">
        	<LeftNav page={"assignment"}/>
        	<div className={"bodyContainer"}>
        		<Dropdown
        			title={"Step 1: input days off"}>
        			<InputDaysOff staff={this.props.staff}
              days={this.props.days}/>
        		</Dropdown>
        		<Dropdown
        			title={"Step 2: distribute ods"}>
        			<div>content</div>
        		</Dropdown>
        		<Dropdown
        			title={"Step 3: format + print"}>
        			<div>content</div>
        		</Dropdown>
        	</div>
        </div>
      </div>
    );
  }
}

export default Assignment;
