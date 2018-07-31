import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
// COMPONENTS
import { Link } from 'react-router-dom';
import { GetMessages } from '../graphql/queries';
import {
  Segment,
  Message,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react';

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
            <Message size='small'>
              <Message.Header>
                <Image avatar src={message.user.picture} /> { message.user.nickname } <small>posted { formatDate(message.createdAt) }</small>
                <Link to={`message/${message.id}`}><Icon link name='arrow right' /></Link>
              </Message.Header>
                {message.message}
            </Message>  
            <Button
              color='green'
              icon='comment'
              label={{ basic: true, pointing: 'left', content: `${message.comments.length}` }}
            />
            <Button
              color='blue'
              icon='thumbs up outline'
              label={{ basic: true, pointing: 'left', content: `${message.likes.length}` }}
            />
          </Segment>
        ))
      }}
    </Query>

);

export default Messages;
