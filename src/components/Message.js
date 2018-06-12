import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GraphQLID } from 'graphql';
import { GetMessageQuery } from '../graphql/queries';
import Comments from './Comments';


export default class Message extends Component {
  render() {
    console.log(this.props);
    const { messageId } = this.props.match.params;
    const id = { messageId };
    return (
      <Query
        query={GetMessageQuery}
        variables={id}
    >
    {({ loading, error, data }) => {
      if (loading) return (<p>Loading... </p>);
      if (error) return (<p>Error! {error.message}</p>);
      const {message} = data;
      return (
        <div key={message.id} className="message">
          {message.message}
          <div className="author-item">posted by: {message.user.username}</div>
          <Comments comments={message.comments} />
          <p>
            {message.likes.length} likes: {message.likes.map(like => (<span key={like.user.id}>{like.user.username} </span>))}
          </p>
        </div>
      )
    }}
    </Query>)
  }
}
