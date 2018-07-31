import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Button, Icon } from 'semantic-ui-react';

class BaseLayout extends Component {
  logout = () => { this.props.auth.logout(); }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { baseUrl } = this.props;
    const user = JSON.parse(localStorage.getItem('user_info'));
    
    return (
      <div>
        <header>
          <Header as='h1'>
            <div>
              IHD Forum Messages
              <Header.Subheader>Totally secure.</Header.Subheader>
            </div>
            <div>
              <Image src={ user.picture } avatar /> <span>{ user.nickname || 'not logged in' }</span>
            </div>
            
          </Header>
          
          {isAuthenticated() && (
            <div className='header-buttons'>
              <Button basic icon labelPosition='left'>
                <Icon name='add' />
                <Link to={`${baseUrl}/compose`}>New Message</Link>
              </Button>
              <Button basic color='red' onClick={this.logout}>Log Out</Button>
            </div>
          )}
        </header>
        
          { this.props.children }
        
      </div>
    );
  }
}

export default BaseLayout;
