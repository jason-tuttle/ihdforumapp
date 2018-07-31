import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
// COMPONENTS
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { GetMessages } from '../graphql/queries';
import { Segment, Comment, Header } from 'semantic-ui-react';

const formatDate = (date) => {
  const formatted = new Date(date);
  return moment(formatted).calendar()
};

const Messages = () => (
  
    <Query query={ GetMessages }>
      {({ loading, error, data }) => {
        if (loading) return (<Segment loading></Segment>);
        if (error) return (<p>Oh, shit! Error! {error.message}</p>);

        return data.messages.map(message => (
          <Segment key={message.id}>
            {message.message} <Link to={`message/${message.id}`} id={message.id} >&#8658;</Link>
            <div className="footer">
              posted by: { message.user.nickname }<br />
              posted { formatDate(message.createdAt) }
            </div>
            <Comment.Group>
              {message.comments.length > 0 && (
                <Header as='h4'>
                  Comments:
                </Header>)}
              <Comments comments={message.comments} />
            </Comment.Group>
            <p>
              {message.likes.length} likes
            </p>
            <hr />
          </Segment>
        ))
      }}
    </Query>

);

export default Messages;
