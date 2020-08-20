import React from 'react';
import Type from './Type';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const TypeList = () => {
  const TYPE_QUERY = gql`
    {
      types {
        id
        name
      }
    }
  `;

  return (
    <div>
      <h2>Type List Comp</h2>
      <div>
        {/* <Query query={TYPE_QUERY}>
          {() => linksToRender.map(link => <Type key={link.id} link={link} />)}
        </Query> */}
        <Query query={TYPE_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>;
            }
            if (error) {
              // Check if error response is JSON
              try {
                JSON.parse(error.networkError.bodyText);
              } catch (e) {
                // If not replace parsing error message with real one
                error.networkError.message = error.networkError.bodyText;
              }
              return <div>{error.networkError.message}</div>;
            }
            const typesToRender = data.types;

            return (
              <div>
                {typesToRender.map(type => (
                  <Type key={type.id} type={type} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default TypeList;
