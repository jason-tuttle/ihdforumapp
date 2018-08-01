import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Icon, Segment, Comment, Header, Message, Image } from 'semantic-ui-react';
import { GetMessageQuery } from '../graphql/queries';
import { AddComment } from '../graphql/mutations';
import Comments from './Comments';

export default class MessageItem extends Component {
  formatDate = (date) => {
    const formatted = new Date(date);
    return moment(formatted).calendar()
  };
  
  render() {
    let commentInput;
    const user = JSON.parse(localStorage.getItem('user_info'));
    const { messageId } = this.props.match.params;
    const id = { messageId };
    const { baseUrl } = this.props;

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
            <Button basic icon labelPosition='left'>
              <Icon name='arrow left' />
              <Link to={`${baseUrl}/home`}>Back to Messages</Link>
            </Button>
            <Segment key={message.id}>
              <Message size='large'>
                <Message.Header>
                  <Image avatar src={message.user.picture} /> { message.user.nickname } <small>posted { this.formatDate(message.createdAt) }</small>
                </Message.Header>
                  {message.message}
              </Message>              
              <p>
                {message.likes.length} likes
              </p>
              <hr />
            </Segment>
            <div className="comments-container">
              <Mutation
                mutation={ AddComment }
                update={ (cache, { data: { addComment } } ) => {
                  const { message } = cache.readQuery({ query: GetMessageQuery, variables: id });
                  const data = { 
                    message: { 
                      ...message,
                      comments: [
                        ...message.comments,
                        {
                          ...addComment,
                          id: 'TEMP',
                          user: {
                            user_id: user.sub,
                            nickname: user.nickname,
                            picture: user.picture,
                            __typename: 'User',
                          },
                          createdAt: Date.now(),
                        }
                      ]
                    }
                  };
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

              <Comment.Group size='large'>
                {message.comments.length > 0 && (
                  <Header as='h5'>
                    COMMENTS:
                  </Header>)}
                <Comments comments={message.comments} />
              </Comment.Group>


            </div>
          </div>
        )
      }}
    </Query>)
  }
}
