import React, { Component } from 'react';
import triangle from '../triangle.png';
import './Dropdown.css';

class Dropdown extends Component {
  state = {
    open: true
  }

  toggleDropdown = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className="dropdownContainer">
        <div className="titleContainer" onClick={this.toggleDropdown}>
          <img src={triangle} alt="triangle"
            className={`triangle ${this.state.open ? "open" : ""}`}/>
          <div className={"title"}>{this.props.title}</div>
        </div>
        <div className="contentContainer">
          {this.state.open ? this.props.children : null}
        </div>
      </div>
    );
  }
}

export default Dropdown;
