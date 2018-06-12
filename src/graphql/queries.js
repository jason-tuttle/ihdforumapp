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
          id
          username
        }
      }
      likes {
        user {
          id
          username
        }
      }
      user {
        username
        id
      }
    }
  }`;

const GetMessageQuery = gql`
  query message($messageId: String!) {
    message(id: $messageId) {
      id
      message
      comments {
        id
        comment
        user {
          id
          username
        }
      }
      likes {
        user {
          id
          username
        }
      }
      user {
        username
        id
      }
    }
  }`;

  export { GetMessages, GetMessageQuery };
