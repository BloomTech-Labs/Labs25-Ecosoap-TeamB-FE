import React, { useState } from 'react';

// Apollo imports
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// ant.design imports
import { DeleteOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Input, Popconfirm, Form } from 'antd';

import { TypeSubmit } from './../DataTypeSubmit';

// Query for Apollo Client <Query>
const TYPE_QUERY = gql`
  {
    types {
      id
      name
    }
  }
`;

const UPDATE_TYPE_MUTATION = gql`
  mutation updateTypeMutation($id: ID!, $name: String, $fields: [FieldInput]) {
    updateType(input: { id: $id, name: $name, fields: $fields }) {
      type {
        id
        name
      }
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
  const { Title } = Typography;

  let typesToRender = [];
  const [updatedType, setUpdatedType] = useState({
    id: 0,
    name: '',
    fields: [],
  });

  // TEMPORARY WHILE API IS DOWN
  // for (let i = 1; i < 15; i++) {
  //   typesToRender.push({
  //     id: i.toString(),
  //     name: `Name ${i}`,
  //   });
  // }
  ////////////////////////////////

  const [deleteType] = useMutation(DELETE_TYPE_MUTATION);
  const [updateTypeMutation] = useMutation(UPDATE_TYPE_MUTATION);
  const { loading, error, data, refetch } = useQuery(TYPE_QUERY);

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

  const inputTypeUpdate = e => {
    const newTypeData = {
      ...updatedType,
      [e.target.name]: e.target.value,
    };
    setUpdatedType(newTypeData);
  };

  const submitUpdateType = e => {
    e.preventDefault();
    updateTypeMutation({
      variables: {
        id: updatedType.id,
        name: updatedType.name,
        fields: updatedType.fields,
      },
    });
    setUpdatedType({
      id: 0,
      name: '',
      fields: [],
    });
  };

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
              return (
                deleteType({
                  variables: {
                    id:
                      e.target.parentElement.parentElement.firstChild.firstChild
                        .data,
                  },
                }),
                refetch()
              );
            }
          }}
          icon={
            <DeleteOutlined
              onClick={e => {
                return (
                  deleteType({
                    variables: {
                      id:
                        e.target.parentElement.parentElement.parentElement
                          .parentElement.firstChild.firstChild.data,
                    },
                  }),
                  refetch()
                );
              }}
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
      <Title level={2}>Database</Title>
      <div>
        <TypeSubmit refetch={refetch} />
        <Table
          columns={columns}
          dataSource={typesToRender}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TypeList;
