import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TypeSubmit = () => {
  const [newType, setNewType] = useState('');

  const POST_TYPE_MUTATION = gql`
    mutation {
      createType(input: { name: "Test Type From App", fields: [] }) {
        type {
          name
        }
      }
    }
  `;

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

  const onFinish = values => {
    console.log('Success:', values);
    setNewType(values.newDataType);
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
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="New Data Type"
          name="newDataType"
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
