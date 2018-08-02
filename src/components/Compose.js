import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import { AddMessage } from '../graphql/mutations';
import { GetMessages } from '../graphql/queries';
import { Container, Form, TextArea } from 'semantic-ui-react';

export default class addMessage extends Component {

  render() {
    let messageInput;
    const { history, baseUrl } = this.props;
    const user = JSON.parse(localStorage.getItem('user_info'));
    
    return (
      <Mutation
        mutation={AddMessage}
        update={ (cache, { data: { addMessage } }) => {
          // add required fields for schema
          const newMessage = Object.assign({}, addMessage, { id: 'tempId', comments: [], likes: [], createdAt: Date.now() });
          // fetch current list from the cache
          const { messages } = cache.readQuery({ query: GetMessages });
          // insert new message at the head (order is most recent first)
          const messagesUpdate = [newMessage, ...messages];
          // write new list back to cache
          cache.writeQuery({ query: GetMessages, data: { messages: messagesUpdate } });
          // redirect
          history.replace(`${baseUrl}/home`);
        }}
      >
        {(addMessage, { data }) => (
          <div>
            <Form onSubmit={(e) => {
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
            }}>
              <TextArea rows={5} ref={node => { messageInput = node; }} placeholder='Type your message...'/>
              <button type="Submit">Add Message</button>
            </Form>
          </div>
        )}
      </Mutation>
    )
  }
}
