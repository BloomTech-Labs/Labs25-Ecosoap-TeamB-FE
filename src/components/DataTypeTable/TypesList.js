import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Table } from 'antd';

// Query for Apollo Client <Query>
const TYPE_QUERY = gql`
  {
    types {
      id
      name
    }
  }
`;

const TypeList = () => {
  let typesToRender = [];

  // Column definitions for Ant Design table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h2>Database</h2>
      <div>
        <Query query={TYPE_QUERY} pollInterval={300}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>;
            }
            if (error !== undefined) {
              console.log(error);

              if (error.networkError !== undefined) {
                // Check if error response is JSON
                try {
                  JSON.parse(error.networkError.bodyText);
                } catch (e) {
                  // If not replace parsing error message with real one
                  error.networkError.message = error.networkError.bodyText;
                }
                return <div>{error.networkError.message}</div>;
              }
            }
            if (data.types !== undefined) {
              typesToRender = data.types;
            }

            return (
              <div>
                <Table
                  columns={columns}
                  dataSource={typesToRender}
                  onChange={onChange}
                />
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default TypeList;
