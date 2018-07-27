import React from 'react';
import { Mutation } from 'react-apollo';
import { AddMessage } from '../graphql/mutations';

const addMessage = () => {
  let messageInput;
  const user = JSON.parse(localStorage.getItem('user_info'));
  console.log(this.props);
  return (
    <Mutation mutation={AddMessage}>
      {(addMessage, { data }) => (
        <div>
          <form onSubmit={e => {
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
            this.props.history.replace(`/ihdforumapp/home`);
          }}>
            <textarea ref={node => { messageInput = node; }} />
            <button type="Submit">Add Message</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default addMessage;