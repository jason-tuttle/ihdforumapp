import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

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
          <div>
            <div className="header">
              <Link to={'/home'}>Back to Messages</Link>
            </div>
            <div key={ message.id } className="message">
              <div className="body">
                { message.message }
              </div>

              <div className="footer">
                posted by: { message.user.nickname }
              </div>

              <p>
                {message.likes.length} Liked By: {message.likes.map(like => (<span key={like.user.user_id}>{like.user.nickname} </span>))}
              </p>

            </div>
            <div className="comments-container">
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
                      <textarea rows="10" wrap="soft" ref={node => { commentInput = node; }} className="comment-input" />
                      <br />
                      <button type="Submit">Add Comment</button>
                    </form>
                  </div>
                )}
              </Mutation>

              <Comments comments={message.comments} />

            </div>
          </div>
        )
      }}
    </Query>)
  }
}
