import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Comments from './Comments';
import {GetMessageQuery} from '../graphql/queries';

export default class Message extends Component {
  render() {
    console.log(this.props);
    const { messageId } = this.props.match.params;
    return (
      <Query
        query={GetMessageQuery}
        variables={messageId}
    >
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading... </p>);
      if (error) return (<p>Error! {error.message}</p>);
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
    </Query>)
  }
}
