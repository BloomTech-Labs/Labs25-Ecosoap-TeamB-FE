import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';

// Query and Mutation for Apollo Client/GraphQL
const TYPE_QUERY = gql`
  {
    types {
      id
      name
    }
  }
`;
const POST_RECORD_MUTATION = gql`
  mutation createNewRecord(
    $name: String!
    $typeId: ID!
    $coordinates: CoordinatesInput!
    $fields: [FieldInput]!
  ) {
    createRecord(
      input: {
        name: $name
        typeId: $typeId
        coordinates: $coordinates
        fields: $fields
      }
    ) {
      record {
        id
        name
        type {
          id
          name
        }
        fields {
          id
          name
          value
        }
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
`;

// Layout variables for Ant Design Form
const layout = {
  labelCol: { span: 4, offset: 0 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const RecordSubmit = props => {
  const [form] = Form.useForm();
  let dataTypes = [];

  const [createNewRecord] = useMutation(POST_RECORD_MUTATION);
  // Query for data types to populate form dropdown
  const { loading, error, data } = useQuery(TYPE_QUERY, {
    pollInterval: 50000,
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
  } else if (data.types !== undefined) {
    dataTypes = data.types;
  }

  // Generate dropdown entries fro selecting Data Types
  const types = [];
  for (let i = 0; i < dataTypes.length; i++) {
    types.push(<Select value={dataTypes[i].id}>{dataTypes[i].name}</Select>);
  }

  const onTypeChange = value => {
    form.setFieldsValue({
      dataRecordType: 'value',
    });
  };

  const onFinish = values => {
    createNewRecord({
      variables: {
        name: values.name,
        typeId: values.dataRecordType,
        coordinates: {
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
        },
        fields: values.fields,
      },
    });
    props.refetch();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        {...layout}
        name="basic"
        // layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input data record name.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dataRecordType"
          label="Record Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select data type."
            onChange={onTypeChange}
            allowClear
          >
            {types}
          </Select>
        </Form.Item>
        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[
            {
              required: true,
              message: 'Please input latitude coordinate in decimal format.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[
            {
              required: true,
              message: 'Please input longitude coordinate in decimal format.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Fields">
          <Form.List name="fields">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map(field => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing field name',
                          },
                        ]}
                      >
                        <Input placeholder="Field Name" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing field value',
                          },
                        ]}
                      >
                        <Input placeholder="Field Value" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RecordSubmit;
