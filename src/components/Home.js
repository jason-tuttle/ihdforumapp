import React, { Component } from 'react';
import Messages from './Messages';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>IHD Forum Messages</h2>
        <div>
          <Messages />
        </div>
      </div>
    );
  }
} 
