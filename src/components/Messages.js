import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// COMPONENTS
import Comments from './comments';

const fetchUser = (user) => {

}

const Messages = () => (
  <Query
    query={gql`
      {
        messages {
          id
          message
          comments {
            id
            comment
            user {
              id
              username
            }
          }
          likes {
            user {
              id
              username
            }
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
          <Comments comments={message.comments} />
          <p>
            {message.likes.length} likes: {message.likes.map(like => (<span key={like.user.id}>{like.user.username} </span>))}
          </p>
        </div>
      ))
    }}
  </Query>
);

export default Messages;
