import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { AddMessage } from '../graphql/mutations';
import { Redirect } from 'react-router-dom';

export default class addMessage extends Component {
  
  
  render() {
    let messageInput;
    const { history, baseUrl } = this.props;
    const user = JSON.parse(localStorage.getItem('user_info'));
    
    return (
      <Mutation mutation={AddMessage}>
        {(addMessage, { data }) => (
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              addMessage({
                variables: {
                  message: {
                    message: messageInput.value,
                    user: user.sub,
                  }
                }
              });
              messageInput.value = "";
              return history.replace(`${baseUrl}/home`);
            }}>
              <textarea rows={5} ref={node => { messageInput = node; }} className="comment-input" />
              <button type="Submit">Add Message</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}
