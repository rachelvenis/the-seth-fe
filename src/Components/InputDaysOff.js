import React, { Component } from 'react';
import the_seth_logo from '../the-seth-logo.png';
import './InputDaysOff.css';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';

function matchName(staff, value) {
  return (
    staff.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

function matchDate(day, value) {
  return (
    day.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

function idsToLabels(ids, staff, days) {
  let results = [];
  ids.forEach(item => {
    let result = {id: results.length};
    for(let i in staff) {
      if (staff[i].id == item[0]) {
        result['name'] = "" + staff[i].firstName + " " + staff[i].lastName;
      }
    }
    for(let i in days) {
      if (days[i].id == item[1]) {
        result['date'] = "" + days[i].dayOfCamp;
      }
    }
    result['errors'] = item[2];
    results.push(result);
  })
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
      if (inputs[i].date == days[day].dayOfCamp) {
        result['dayId'] = days[day].id;
      }
    }
    prepared.push(result);
  }
  return prepared;
}

const SingleInput = (props) => (
<div className="singleInput">
  <Autocomplete
    items={props.staff.map(s => (
      {label: "" + s.firstName + " " + s.lastName,
      id: s.id}))}
    getItemValue={ item => item.label }
    renderItem={(item, isHighlighted) =>
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.label}
      </div>
    }
    value={props.name}
    onChange={props.nameChange(props.id)}
    onSelect={props.nameSelect(props.id)}
    className={`input ${props.state}`}
    placeholder="Staff Name"
    shouldItemRender={matchName}
  />
  <Autocomplete
    items={props.days.map(s => (
      {label: "" + s.dayOfCamp, id: s.id}))}
    getItemValue={ item => item.label }
    renderItem={(item, isHighlighted) =>
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.label}
      </div>
    }
    value={props.date}
    onChange={props.dateChange(props.id)}
    onSelect={props.dateSelect(props.id)}
    className={`input ${props.state}`}
    placeholder="Staff Name"
    shouldItemRender={matchDate}
  />
  <div>
    {props.errors.map(e =>  <div>{e}</div>)}
  </div>
</div>);


class InputDaysOff extends Component {
  state = {
    inputs: [
      {id: 0, name: "", date: "", errors: []}
    ]
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
        this.setState({ inputs: idsToLabels(res.data.assignments, this.props.staff, this.props.days) })
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
      <div className="no">
        {this.state.inputs.map(i => 
            (<SingleInput
            name={i.name}
            date={i.date}
            id={i.id}
            dateChange={this.dateChange}
            nameChange={this.nameChange}
            state={i.state}
            staff={this.props.staff}
            days={this.props.days}
            nameSelect={this.nameSelect}
            dateSelect={this.dateSelect}
            errors={i.errors}/>
            ))
        }
        <button className="addStaffButton" onClick={this.addNewAssignment}>
          +
        </button>
        <button className="processButton" onClick={this.processAssignment}>
          process
        </button>
      </div>
    );
  }
}
//        <button className="addStaffButton" onClick={this.addNewAssignment}>
//          button
//        </button>

export default InputDaysOff;
