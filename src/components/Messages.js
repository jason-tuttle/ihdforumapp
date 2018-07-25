import React from 'react';
import { Query } from 'react-apollo';
// COMPONENTS
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { GetMessages } from '../graphql/queries';


const Messages = () => (
  <Query query={ GetMessages }>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading... </p>);
      if (error) return (<p>Oh, shit! Error! {error.message}</p>);

      return data.messages.map(message => (
        <div key={message.id} className="message">
          {message.message} <Link to={`message/${message.id}`} id={message.id} >&#8658;</Link>
          <Comments comments={message.comments} />
          <p>
            {message.likes.length} likes: {message.likes.map(like => (<span key={like.user.user_id}>{like.user.nickname} </span>))}
          </p>
          <hr />
        </div>
      ))
    }}
  </Query>
);

export default Messages;
