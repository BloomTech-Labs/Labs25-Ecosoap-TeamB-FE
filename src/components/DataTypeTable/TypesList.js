import React, { useState } from 'react';

// Apollo imports
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// ant.design imports
import { DeleteOutlined } from '@ant-design/icons';
import {
  Typography,
  Table,
  Button,
  Input,
  Popconfirm,
  Form,
  Row,
  Divider,
} from 'antd';

import { TypeSubmit } from './../DataTypeSubmit';

import '../../styles/tableStyles.css';

// Query for Apollo Client
const TYPE_QUERY = gql`
  {
    types {
      id
      name
    }
  }
`;

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

const TypeList = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  let typesToRender = [];

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

  const submitUpdateType = props => {
    updateTypeMutation({
      variables: {
        id: props.key.toString(),
        name: props.newType.name.toString(),
      },
    });
  };

  const isEditing = record => record.id === editingKey;
  const edit = record => {
    form.setFieldsValue({
      id: '',
      name: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const newType = await form.validateFields();
      submitUpdateType({ key, newType });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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
            <Input />
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
      title: 'Data Type',
      dataIndex: 'name',
      editable: true,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      // title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
              type="primary"
              size="small"
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button size="small">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Row justify="center">
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
          </Row>
        );
      },
    },
    {
      // title: 'Delete',
      dataIndex: 'delete',
      editable: false,
      key: 'x',
      render: (_, record) => (
        <Row justify="center">
          <Button
            danger
            onClick={e => {
              return (
                deleteType({
                  variables: {
                    id: record.id,
                  },
                }),
                refetch()
              );
            }}
            icon={<DeleteOutlined />}
          />
        </Row>
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

  function tableFcns(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <Divider />
      <div style={{ width: '90%', margin: '0 40px' }}>
        <Title level={2}>Submit new data type</Title>
        <TypeSubmit refetch={refetch} />
      </div>
      <Divider />
      <div style={{ width: '90%', maxWidth: '850px', margin: '0 40px' }}>
        <Title level={2}>Database</Title>

        <Form form={form} component={false}>
          <Table
            style={{ padding: '20px 40px' }}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={typesToRender}
            columns={mergedColumns}
            rowClassName="editable-row"
            onChange={tableFcns}
          />
        </Form>
      </div>
    </div>
  );
};

export default TypeList;
