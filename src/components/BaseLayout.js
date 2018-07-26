import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BaseLayout extends Component {

  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
      <div>
        <header>
          <h1 className="header title">IHD Forum Redux</h1>
          <h3 className="header subtitle">Totally secure.</h3>
          {isAuthenticated() && (
            <Link to={'/compose'}>+ New Message</Link>
          )}
        </header>
        <div style={{height: 'calc(100vh - 125px)'}}>
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseLayout;
