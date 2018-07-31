import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

class Comments extends Component {
  formatDate = (date) => {
    const formatted = new Date(date);
    return moment(formatted).calendar()
  };
  
  render() {
    const {comments} = this.props;
    
    return comments.map(comment => (
      <Comment key={comment.id}>
        <Comment.Avatar src={comment.user.picture} />
        <Comment.Content>
          <Comment.Author>from {comment.user.nickname}</Comment.Author>
          <Comment.Metadata>
            posted: {this.formatDate(comment.createdAt)}
          </Comment.Metadata>
          <Comment.Text>{comment.comment}</Comment.Text>
        </Comment.Content>
        
      </Comment>
    ))
  }
}

export default Comments;