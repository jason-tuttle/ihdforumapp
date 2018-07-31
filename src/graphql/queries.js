import gql from 'graphql-tag';

const GetMessages = gql`
  {
    messages {
      id
      message
      comments {
        id
        comment
        user {
          user_id
          nickname
        }
        createdAt
      }
      likes {
        user {
          user_id
          nickname
        }
      }
      user {
        nickname
        user_id
        picture
      }
      createdAt
    }
  }`;

const GetMessageQuery = gql`
  query message($messageId: ID!) {
    message(id: $messageId) {
      id
      message
      comments {
        id
        comment
        user {
          user_id
          nickname
          picture
        }
        createdAt
      }
      likes {
        user {
          user_id
          nickname
        }
      }
      user {
        nickname
        user_id
        picture
      }
      createdAt
    }
  }`;

  export { GetMessages, GetMessageQuery };
