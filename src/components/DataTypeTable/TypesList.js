import React from 'react';

import { Query, useMutation } from 'react-apollo';
import gql from 'graphql-tag';

// ant.design icons
import { DeleteOutlined } from '@ant-design/icons';
import { Table, Button } from 'antd';

// Query for Apollo Client <Query>
const TYPE_QUERY = gql`
  {
    types {
      id
      name
    }
  }
`;

const DELETE_TYPE_MUTATION = gql`
  mutation deleteType($id: ID!) {
    deleteType(input: { id: $id }) {
      success
      error
    }
  }
`;

const TypeList = () => {
  let typesToRender = [];
  const [deleteType] = useMutation(DELETE_TYPE_MUTATION);

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
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'x',
      render: () => (
        // e.target.parentElement.parentElement.firstChild.firstChild.data
        <Button
          danger
          onClick={e => {
            if (
              typeof e.target.parentElement.parentElement.firstChild.firstChild
                .data === 'string'
            ) {
              return deleteType({
                variables: {
                  id:
                    e.target.parentElement.parentElement.firstChild.firstChild
                      .data,
                },
              });
              //   console.log(
              //   e.target.parentElement.parentElement.firstChild
              //     .firstChild.data
              // )
            }
          }}
          icon={
            <DeleteOutlined
              onClick={
                e =>
                  deleteType({
                    variables: {
                      id:
                        e.target.parentElement.parentElement.parentElement
                          .parentElement.firstChild.firstChild.data,
                    },
                  })

                // console.log(
                //   e.target.parentElement.parentElement.parentElement
                //     .parentElement.firstChild.firstChild.data
                // )
              }
            />
          }
        />
      ),
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
