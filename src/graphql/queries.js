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
      }
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
        }
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
      }
    }
  }`;

  export { GetMessages, GetMessageQuery };
