import React, { Component } from 'react';
class Comments extends Component {
  render() {
    const {comments} = this.props;
    return comments.map(comment => (
      <p className="comment" key={comment.id}>
        {comment.comment}
        <br />
        from: {comment.user.nickname}
      </p>))
  }
}

export default Comments;