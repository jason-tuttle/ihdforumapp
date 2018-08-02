import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image, Button, Icon } from 'semantic-ui-react';

class BaseLayout extends Component {
  logout = () => { this.props.auth.logout(); }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { baseUrl } = this.props;
    const getUser = () => JSON.parse(localStorage.getItem('user_info'));
    
    return (
      <Container fluid>

          <Header as='h1'>
            <div>
              IHD Forum Messages
              <Header.Subheader>Totally secure.</Header.Subheader>
            </div>
            {getUser() && (
              <div>
                <Image src={ getUser().picture } avatar /> <span>{ getUser().nickname || 'not logged in' }</span>
              </div>
            )}
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
        
          { this.props.children }
        
      </Container>
    );
  }
}

export default BaseLayout;
