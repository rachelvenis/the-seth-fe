import React, { Component } from 'react';
import the_seth_logo from '../the-seth-logo.png';
import './InputDaysOff.css';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Dropdown from './Dropdown';
import QuotaResults from './QuotaResults';

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

const SingleInput = (props) => (
<div className="singleInput">
  <Autocomplete
    items={props.staff.map(s => (
      {label: "" + s.firstName + " " + s.lastName,
      id: s.id}))}
    getItemValue={ item => item.label }
    renderItem={(item, isHighlighted) =>
      <div style={{ background: isHighlighted ? 'lightgray' : 'white',
      fontFamily: 'Julius Sans One' }}>
        {item.label}
      </div>
    }
    value={props.name}
    onChange={props.nameChange(props.id)}
    onSelect={props.nameSelect(props.id)}
    className={`input ${props.state}`}
    shouldItemRender={matchName}
    inputProps={{
      style: { padding: '2px',
        fontFamily: 'Julius Sans One',
        margin: '0px 8px 0px 0px',
        width: '226px',
        border: '1px solid ' +
          (props.processed ? ((props.errors.length > 0 && props.errors[0] != null) ?
            'red' : 'green') : 'grey')},
      placeholder: 'Staff Name' }}
  />
  <Autocomplete
    items={props.days.map(s => (
      {label: s.dayLabel, id: s.id}))}
    getItemValue={ item => item.label }
    renderItem={(item, isHighlighted) =>
      <div style={{ background: isHighlighted ? 'lightgray' : 'white',
      fontFamily: 'Julius Sans One' }}>
        {item.label}
      </div>
    }
    value={props.date}
    onChange={props.dateChange(props.id)}
    onSelect={props.dateSelect(props.id)}
    className={`input ${props.state}`}
    shouldItemRender={matchDate}
    inputProps={{
      style: { padding: '2px',
        fontFamily: 'Julius Sans One',
        margin: '0px 8px 0px 0px',
        width: '226px',
        border: '1px solid ' +
          (props.processed ? ((props.errors.length > 0 && props.errors[0] != null) ?
            'red' : 'green') : 'grey')},
      placeholder: 'Date' }}
  />
  <div>
    {props.errors.map(e =>  <div className="error">{e}</div>)}
  </div>
</div>);


class InputDaysOff extends Component {
  render() {
    return (
      <div className="contentContainerContainer">
        {this.props.inputs.map(i => 
            (<SingleInput
            name={i.name}
            date={i.date}
            id={i.id}
            dateChange={this.props.dateChange}
            nameChange={this.props.nameChange}
            state={i.state}
            staff={this.props.staff}
            days={this.props.days}
            nameSelect={this.props.nameSelect}
            dateSelect={this.props.dateSelect}
            processed={i.processed}
            errors={i.errors}/>
            ))
        }
        <button className="addStaffButton" onClick={this.props.addNewAssignment}>
          +
        </button>
        <button className="processButton" onClick={this.props.processAssignment}>
          process
        </button>
        <QuotaResults quotas={this.props.quotas} cabinQuotas={this.props.cabinQuotas} />
      </div>
    );
  }
}
//        <button className="addStaffButton" onClick={this.addNewAssignment}>
//          button
//        </button>

export default InputDaysOff;
