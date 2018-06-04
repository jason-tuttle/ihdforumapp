import React, { Component } from 'react';

class BaseLayout extends Component {

  render() {
    return (
      <div>
        <header>
          <h1 className="header title">IHD Forum Redux</h1>
          <h3 className="header subtitle">Totally secure.</h3>
        </header>
        <div style={{height: 'calc(100vh - 125px)'}}>
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseLayout;
