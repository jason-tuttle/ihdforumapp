import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GetMessageQuery } from '../graphql/queries';
import { AddComment } from '../graphql/mutations';
import Comments from './Comments';

export default class Message extends Component {
  render() {
    let commentInput;
    const user = JSON.parse(localStorage.getItem('user_info'));
    const { messageId } = this.props.match.params;
    const id = { messageId };
    return (
      <Query
        query={GetMessageQuery}
        variables={id}
      >
      {({ loading, error, data }) => {
        if (loading) return (<p>Loading... </p>);
        if (error) return (<p>Error! { error.message }</p>);
        const { message } = data;
        return (
          <div key={ message.id } className="message">
            { message.message }
            <div className="author-item">posted by: { message.user.nickname }</div>
            <Mutation
              mutation={ AddComment }
              update={ (cache, { data: { addComment } } ) => {
                const { message } = cache.readQuery({ query: GetMessageQuery, variables: id });
                const data = { message: { ...message, comments: [...message.comments, { ...addComment, id: 'TEMP' }] } };
                cache.writeQuery({
                  query: GetMessageQuery,
                  variables: id,
                  data,
                });
              }}
            >
              {(addComment, { data }) => (
                <div>
                  <form onSubmit={e => {
                    e.preventDefault();
                    addComment({
                      variables: {
                        comment: {
                          comment: commentInput.value,
                          messageId: id.messageId,
                          user: user.sub,
                        }
                      }
                    });
                    commentInput.value = "";
                  }}>
                    <textarea ref={node => { commentInput = node; }} />
                    <button type="Submit">Add Comment</button>
                  </form>
                </div>
              )}
            </Mutation>
            <Comments comments={message.comments} />
            <p>
              {message.likes.length} likes: {message.likes.map(like => (<span key={like.user.user_id}>{like.user.nickname} </span>))}
            </p>
          </div>
        )
      }}
    </Query>)
  }
}
