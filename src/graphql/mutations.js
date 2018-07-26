import gql from 'graphql-tag';

const AddMessage = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(messageInput: $message) {
      message
      user {
        user_id
        nickname
      }
    }
  }
`;

const AddComment = gql`
  mutation addComment($comment: CommentInput!) {
    addComment(commentInput: $comment) {
      comment
      message {
        id
        comments {
          id
        }
      }
      user {
        user_id
        nickname
      }
    }
  }
`;

export { AddMessage, AddComment };