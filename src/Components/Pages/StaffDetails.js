import React, { Component } from 'react';
import './StaffDetails.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
import axios from 'axios';

class StaffDetails extends Component {
  state = {
    staff: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:3100/api/staff')
      .then(res => this.setState({ staff: res.data }));
  }

  render() {
	  return (
	    <div className="staffDetailsContainer">
	      <Header title={"Staff Details"}/>
          <div className="horizontalLine"></div>
	      <div className="astaff">
		      <LeftNav page={"staff"}/>
		      <div className="staffContainer">
			      {this.state.staff.map(
			      	staff =>
			      	<div className="astaff" >
			      		{staff.id} | 
						{staff.firstName} | 
						{staff.lastName} | 
						{staff.od_count} | 
						{staff.allowed_days_off} | 
						{staff.colour_wars_duty} | 
						{staff.walden_games_duty} | 
						{staff.rotating_od} | 
						{staff.birth_year} | 
						{staff.half_unit} | 
						{staff.new_to_walden} | 
						{staff.day_off_count} | 
						{staff.head_staff} | 
						{staff.cabin} | 
						{staff.gender} | 
						{staff.last_day_off} | 
						{staff.role} | 
			      	</div>)}
			  </div>
	      </div>
	    </div>
	  );
	}
}

export default StaffDetails;
