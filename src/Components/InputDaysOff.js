import React, { Component } from 'react';
import the_seth_logo from '../the-seth-logo.png';
import './InputDaysOff.css';

const SingleInput = (props) => (
<div className="singleInput">
  <input type="text" className="input" placeholder="Staff Name"
    value={props.name} onChange={props.nameChange(props.id)}>
  </input>
  <input type="text" className="input" placeholder="Date"
    value={props.date} onChange={props.dateChange(props.id)}>
  </input>
</div>);


class InputDaysOff extends Component {
  state = {
    inputs: [
      {id: 12, name: "rachy", date: "july 2"}
    ]
  };

  addNewAssignment = (e) => {
    this.setState({
      inputs: [...this.state.inputs,
        {id: this.state.inputs.length, name: "", date: ""}]
    });
  };

  processAssignment = (e) => {
    console.log("processing");
  };

  nameChange = (id) => (e) => {
    this.setState({
      inputs: this.state.inputs.map(input => {
        if (input.id == id) {
          return {name: e.target.value, id: input.id, date: input.date}
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
          return {name: input.name, id: input.id, date: e.target.value}
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
            nameChange={this.nameChange}/>
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
