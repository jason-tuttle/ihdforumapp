import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// COMPONENTS
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { GetMessages } from '../graphql/queries';

const Messages = () => (
  <Query query={ GetMessages }>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading... </p>);
      if (error) return (<p>Error! {error.message}</p>);
      console.log(data);
      return data.messages.map(message => (
        <div key={message.id} className="message">
          {message.message} <Link to={`message/${message.id}`} id={message.id} >&#8658;</Link>
          <Comments comments={message.comments} />
          <p>
            {message.likes.length} likes: {message.likes.map(like => (<span key={like.user.user_id}>{like.user.username} </span>))}
          </p>
        </div>
      ))
    }}
  </Query>
);

export default Messages;
