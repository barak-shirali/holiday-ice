/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';

// Export this for unit testing more easily
export class EnterInfo extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      firstName: '',
      lastInitial: '',
      weight: '',
      timeSkated: '',
    };
  }

  onChange = field => evt => this.setState({ [field]: evt.target.value });

  onSubmit = (evt) => {
    evt.preventDefault();
    const {
      firstName,
      lastInitial,
      weight,
      timeSkated,
    } = this.state;

    this.props.createUser(firstName, lastInitial, weight, timeSkated)
      .then((resp) => {
        this.props.history.push(`/result/${resp.data[5]}`);
      });
  }

  render() {
    const {
      firstName,
      lastInitial,
      weight,
      timeSkated,
    } = this.state;
    const isLoading = this.props.readyStatus === action.CREATE_USER_REQUESTING;
    console.log(this.props.readyStatus);

    return (
      <div>
        <Helmet title="Enter Info" />
        <div className="content-big">
          <p>
            Please enter your info
          </p>
        </div>
        <form className="info" onSubmit={this.onSubmit}>
          <div className="info-white">
            <table border="0" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td><input className="input" value={firstName} onChange={this.onChange('firstName')} /></td>
                </tr>
                <tr>
                  <td>Last Initial</td>
                  <td><input className="input" value={lastInitial} onChange={this.onChange('lastInitial')} /></td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td><input className="input" type="number" value={weight} onChange={this.onChange('weight')} /></td>
                </tr>
                <tr>
                  <td>Time Skated</td>
                  <td><input className="input" type="number" value={timeSkated} onChange={this.onChange('timeSkated')} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-button-wrapper">
            <button type="submit" disabled={isLoading}>
              {isLoading && <span><i className="fa fa-spinner fa-spin" /> Submitting...</span>}
              {!isLoading && 'Submit'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const connector = connect(
  ({ createUser }) => ({ readyStatus: createUser.readyStatus }),
  dispatch => ({
    createUser: (...args) => dispatch(action.createUser(...args)),
  }),
);

export default connector(EnterInfo);
