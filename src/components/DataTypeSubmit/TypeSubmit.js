import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const POST_TYPE_MUTATION = gql`
  mutation createNewType($name: String!, $fields: [FieldInput]) {
    createType(input: { name: $name, fields: $fields }) {
      type {
        id
        name
      }
    }
  }
`;


const TypeSubmit = props => {
  const [form] = Form.useForm();
  const [newType, setNewType] = useState('');

  const [createNewType] = useMutation(POST_TYPE_MUTATION);

  // Layout variables for Ant Design form
  const layout = {
    labelCol: {
      span: 12,
      offset: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 20,
      span: 4,
    },
  };

  const inputChange = e => {
    setNewType(e.target.value);
  };


  const onFinish = () => {
    createNewType({
      variables: { name: newType, fields: [] },
    });
    props.refetch();
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        layout="inline"
        initialValues={{
          newDataType: '',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="New Data Type"
          name="newDataType"
          value={newType}
          onChange={inputChange}
          rules={[
            {
              required: true,
              message: 'Please input a new data type',
            },
          ]}
        >
          <Input />
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

export default TypeSubmit;
