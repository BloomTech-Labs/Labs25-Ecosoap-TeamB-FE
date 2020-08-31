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
// const POST_TYPE_MUTATION = gql`
//   mutation createNewType($name: String!, $fields: [FieldInput]) {
//     createType(input: { name: $name, fields: $fields }) {
//       type {
//         id
//         name
//       }
//     }
//   }
// `;

const UPDATE_TYPE_MUTATION = gql`
  mutation updateTypeMutation($id: ID!, $name: String) {
    updateType(input: { id: $id, name: $name }) {
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

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           <Input onChange={inputTypeUpdate} />
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

const TypeList = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  let typesToRender = [];

  const [updatedType, setUpdatedType] = useState('');
  const [editingKey, setEditingKey] = useState('');

  const [deleteType] = useMutation(DELETE_TYPE_MUTATION);
  const [updateTypeMutation] = useMutation(UPDATE_TYPE_MUTATION);
  const { loading, error, data, refetch } = useQuery(TYPE_QUERY, {
    pollInterval: 20000,
  });

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
    e.persist();
    // const newTypeData = {
    //   ...updatedType,
    //   [e.target.name]: e.target.value,
    // };
    setUpdatedType(e.target.value);
  };

  const submitUpdateType = key => {
    // e.preventDefault();
    console.log('Key', key);
    console.log('Update', updatedType);
    console.log('Fields', []);

    updateTypeMutation({
      variables: {
        id: key.toString(),
        name: updatedType.toString(),
      },
    });
    setUpdatedType('');
  };

  const isEditing = record => record.id === editingKey;
  const edit = record => {
    form.setFieldsValue({
      id: '',
      name: '',
      ...record,
    });
    setEditingKey(record.id);
    console.log(record);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = key => {
    // console.log(key);
    // console.log(updatedType);
    submitUpdateType(key);
    setEditingKey('');

    // try {
    //   const row = await form.validateFields();
    //   const newData = [...data];
    //   const index = newData.findIndex(item => key === item.key);

    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, { ...item, ...row });
    //     console.log(newData);
    //     setEditingKey('');
    //   } else {
    //     newData.push(row);
    //     console.log(newData);
    //     setEditingKey('');
    //   }
    // } catch (errInfo) {
    //   console.log('Validate Failed:', errInfo);
    // }
  };

  // TEMPORARY WHILE API IS DOWN
  // for (let i = 1; i < 15; i++) {
  //   typesToRender.push({
  //     id: i.toString(),
  //     name: `Name ${i}`,
  //   });
  // }
  ////////////////////////////////

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input onChange={inputTypeUpdate} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // Column definitions for Ant Design table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      editable: false,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Data Type',
      dataIndex: 'name',
      editable: true,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      editable: false,
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
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <TypeSubmit refetch={refetch} />

      <div>
        <Title level={2}>Database</Title>

        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={typesToRender}
            columns={mergedColumns}
            rowClassName="editable-row"
            // pagination={{
            //   onChange: cancel,
            // }}
            onChange={onChange}
          />
        </Form>
        {/* <Table
          columns={columns}
          dataSource={typesToRender}
          onChange={onChange}
        /> */}
      </div>
    </div>
  );
};

export default TypeList;
