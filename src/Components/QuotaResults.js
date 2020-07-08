import React, { Component } from 'react';
import the_seth_logo from '../the-seth-logo.png';
import './QuotaResults.css';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Dropdown from './Dropdown';

class QuotaResults extends Component {
  render() {
    return (this.props.quotas.length > 0 ||
			!Object.values(this.props.cabinQuotas).reduce((t, n) => t && (n.length > 0), true) ?
			<Dropdown title="Quota Results" level="levelTwo">
        {Object.entries(this.props.quotas).map(([k,v]) => {
          return this.props.cabinQuotas[k] &&
            this.props.cabinQuotas[k].length > 0 ?
            <Dropdown
              title={k}
              open={false}
              level="levelThree">
              {this.props.cabinQuotas[k].map(i => <div>{i}</div>)}
            </Dropdown> :
            <div className={`quotaTitle ${v}`}>{k}</div>
          })}
        </Dropdown> : null);
	}
}

export default QuotaResults;
