import React, { Component } from 'react';
import loading from '../logo.svg';

export default class Callback extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}