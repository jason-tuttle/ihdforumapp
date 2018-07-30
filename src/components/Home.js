import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Messages from './Messages';

export default class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
      <div>
        <h2>IHD Forum Messages</h2>
        
        <div>
          {isAuthenticated() && 
            <Messages />
          }
        </div>
      </div>
    );
  }
} 
