import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Messages = () => (
  <Query
    query={gql`
      {
        messages {
          id
          message
          comments {
            comment
          }
          user {
            username
            id
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading... </p>;
      if (error) return <p>Error! {error}</p>;
      console.log(data);
      return data.messages.map(message => (
        <div key={message.id} className="message">
          {message.message}
          {message.comments.map(comment => (<p className="comment" key={comment.id}>
            {comment.comment}
          </p>))}
        </div>
      ))
    }}
  </Query>
);

export default Messages;