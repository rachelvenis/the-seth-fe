import React, { Component } from 'react';
import './Assignment.css';
import Header from '../Header';
import LeftNav from '../LeftNav';
import Dropdown from '../Dropdown';
import InputDaysOff from '../InputDaysOff';
import axios from 'axios';

function idsToLabels(ids, staff, days) {
  let results = [];
  ids.forEach(item => {
    let result = {id: results.length, processed: true};
    for(let i in staff) {
      if (staff[i].id == item[0]) {
        result['name'] = "" + staff[i].firstName + " " + staff[i].lastName;
      }
    }
    for(let i in days) {
      if (days[i].id == item[1]) {
        result['date'] = "" + days[i].dayLabel;
      }
    }
    result['errors'] = item[2];
    results.push(result);
  })
  return results;
}

function odIdsToLabels(ids, staff, days) {
  let results = {};
  console.log(ids);
  for (let day in ids) {
    console.log(day);
    let newDay = [];
    ids[day].forEach(item => {
      let result = {id: results.length, processed: true};
      for(let i in staff) {
        if (staff[i].id == item[0]) {
          result['name'] = "" + staff[i].firstName + " " + staff[i].lastName;
        }
      }
      result['halfUnit'] = item[2];
      result['errors'] = item[3];
      newDay.push(result);
    })
    for(let i in days) {
      if (days[i].id == day) {
        results[days[i].dayLabel] = newDay;
        break;
      }
    }
  }
  console.log(results);
  return results;
}

function prepareToValidate(inputs, staff, days) {
  let prepared = [];
  for (let i = 0; i < inputs.length; i++) {  
    let result = {};
    if(inputs[i].name == "") continue;
    for(const aStaff in staff) {
      if (inputs[i].name == ("" + staff[aStaff].firstName + " " + staff[aStaff].lastName)) {
        result['staffId'] = staff[aStaff].id;
      }
    }
    for(const day in days) {
      if (inputs[i].date == days[day].dayLabel) {
        result['dayId'] = days[day].id;
      }
    }
    prepared.push(result);
  }
  return prepared;
}

class Assignment extends Component {
  state = {
    inputs: [
      {id: 0, name: "", date: "", errors: []}
    ],
    ods: [],
    quotas: {},
    cabinQuotas: {}
  };

  getODStartAndEnd = () => {
    let result = {};
    let min = 100;
    let max = 0;
    for(let i = 0; i < this.state.inputs.length; i++) {
      for(const day in this.props.days) {
        if (this.state.inputs[i].date == this.props.days[day].dayLabel) {
          min = Math.min(min, this.props.days[day].id);
        }
      }
    }
    for(let i = 0; i < this.state.inputs.length; i++) {
      for(const day in this.props.days) {
        if (this.state.inputs[i].date == this.props.days[day].dayLabel) {
          max = Math.max(max, this.props.days[day].id);
        }
      }
    }
    result.start = min;
    result.end = max;
    return result;
  }

  distributeODs = (e) => {
    axios
      .post('http://localhost:3100/api/actions/distributeOD', this.getODStartAndEnd())
      .then(res => {
        // console.log(odIdsToLabels(res.data.assignments, this.props.staff, this.props.days));
        this.setState({ ods: odIdsToLabels(res.data.assignments, this.props.staff, this.props.days) })
      });
  };

  addNewAssignment = (e) => {
    this.setState({
      inputs: [...this.state.inputs,
        {id: this.state.inputs.length, name: "", date: "", errors: []}]
    });
  };

  processAssignment = (e) => {
    axios
      .post('http://localhost:3100/api/actions/validateDO',
        prepareToValidate(this.state.inputs, this.props.staff, this.props.days))
      .then(res => {
        this.setState({ inputs: idsToLabels(res.data.assignments, this.props.staff, this.props.days),
          quotas: res.data.quotas, cabinQuotas: res.data.cabinQuotas })
      });
  };

  nameChange = (id) => (e) => {
    this.setState({
      inputs: this.state.inputs.map(input => {
        if (input.id == id) {
          return {name: e.target.value, id: input.id, date: input.date, errors: []}
        }
        else {
         return input
        }
      })});
  };

  nameSelect = (id) => (val) => {
    this.setState({
      inputs: this.state.inputs.map(input => {
        if (input.id == id) {
          return {name: val, id: input.id, date: input.date, errors: []}
        }
        else {
          return input
        }
      })});
  };

  dateSelect = (id) => (val) => {
    this.setState({
      inputs: this.state.inputs.map(input => {
        if (input.id == id) {
          return {name: input.name, id: input.id, date: val, errors: []}
        }
        else {
          return input
        }
      })});
  };

  dateChange = (id) => (e) => {
    this.setState({
      inputs: this.state.inputs.map(input => {
        if (input.id == id) {
          return {name: input.name, id: input.id, date: e.target.value, errors: []}
        }
        else {
          return input
        }
      })});
  };

  render() {
    return (
      <div className="assignmentContainer">
        <Header title={"New Assignment"}/>
        <div className="horizontalLine"></div>
  	  <div className="astaff">
        	<LeftNav page={"assignment"}/>
        	<div className={"bodyContainer"}>
        		<Dropdown
        			title={"Step 1: input days off"}
              open={true}>
        			<InputDaysOff
              staff={this.props.staff}
              days={this.props.days}
              inputs={this.state.inputs}
              quotas={this.state.quotas}
              cabinQuotas={this.state.cabinQuotas}
              addNewAssignment={this.addNewAssignment}
              processAssignment={this.processAssignment}
              nameChange={this.nameChange}
              nameSelect={this.nameSelect}
              dateSelect={this.dateSelect}
              dateChange={this.dateChange}/>
        		</Dropdown>
        		<Dropdown
        			title={"Step 2: distribute ods"}>
              <button className="processButton" onClick={this.distributeODs}>
                Distribute
              </button>
              <div>
                {Object.entries(this.state.ods).map(([k,v]) => (
                  <div>
                    <Dropdown className="ODdayHeader" title={k} level="levelTwo">
                      <div className="ODDayContent">
                        {v.map(i =>
                          <div className="ODSingleDay">
                            <div className="ODDayName">{i.name}</div>
                            <div className="ODDayUnit">{i.halfUnit}</div>
                          </div>)}
                      </div>
                    </Dropdown>
                  </div>))}
              </div>
        		</Dropdown>
        		<Dropdown
        			title={"Step 3: format + print"}>
              <a href="http://localhost:3100/api/actions/generatePDF"
              download="thefile.pdf"
              title="thefile"
              className="formatButton"
              target="_blank">Format + Print</a>
        		</Dropdown>
        	</div>
        </div>
      </div>
    );
  }
}

export default Assignment;
