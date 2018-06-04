import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class Message extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query
        query={gql`
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
          }
      `}
    >
    </Query>)
  }
}