import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
// COMPONENTS
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { GetMessages } from '../graphql/queries';

const formatDate = (date) => moment(date).calendar();


const Messages = () => (
  <Query query={ GetMessages }>
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading... </p>);
      if (error) return (<p>Oh, shit! Error! {error.message}</p>);

      return data.messages.map(message => (
        <div key={message.id} className="message">
          {message.message} <Link to={`message/${message.id}`} id={message.id} >&#8658;</Link>
          <div className="footer">
            posted by: { message.user.nickname }<br />
            posted { formatDate(message.createdAt) }
          </div>
          <Comments comments={message.comments} />
          <p>
            {message.likes.length} likes
          </p>
          <hr />
        </div>
      ))
    }}
  </Query>
);

export default Messages;
