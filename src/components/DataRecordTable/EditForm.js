import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';

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

const UPDATE_RECORD_MUTATION = gql`
  mutation updateRecordMutation(
    $id: ID!
    $name: String
    $coordinates: CoordinatesInput!
    $fields: [FieldInput!]
  ) {
    updateRecord(
      input: {
        id: $id
        name: $name
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
  labelCol: { span: 5, offset: 2 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const EditForm = props => {
  console.log('edit form props', props.modalData.id);
  // for (let i = 0; i < props.modalData.fields.length; i++) {
  //   console.log(props.modalData.fields[i]);
  // }
  const [form] = Form.useForm();
  let dataTypes = [];
  const [updateRecordMutation] = useMutation(UPDATE_RECORD_MUTATION);
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

  // Generate dropdown entries for selecting Data Types
  const types = [];
  for (let i = 0; i < dataTypes.length; i++) {
    types.push(<Select value={dataTypes[i].id}>{dataTypes[i].name}</Select>);
  }

  const onTypeChange = value => {
    console.log(value);
    form.setFieldsValue({
      dataRecordType: 'value',
    });
  };

  const onFinish = values => {
    console.log('onFinish vlues', Object.values(values.fields));
    const updatedFields = [];
    for (let i = 0; i < Object.values(values.fields).length; i++) {
      Object.values(values.fields)[i].name = Object.values(values.fields)[
        i
      ].name.toString();
      Object.values(values.fields)[i].value = Object.values(values.fields)[
        i
      ].value.toString();
      updatedFields.push(Object.values(values.fields)[i]);
      console.log(updatedFields);
    }
    updateRecordMutation({
      variables: {
        id: props.modalData.id,
        name: values.name,
        coordinates: {
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
        },
        fields: updatedFields,
      },
    });
    //    createNewRecord({
    //      variables: {
    //        name: values.name,
    //        typeId: values.dataRecordType,
    //        coordinates: {
    //          latitude: parseFloat(values.latitude),
    //          longitude: parseFloat(values.longitude),
    //        },
    //        fields: values.fields,
    //      },
    //    });
    props.handleOk();
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
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          initialValue={props.modalData.name}
          rules={[
            { required: true, message: 'Please input data record name.' },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="dataRecordType"
          label="Record Type"
          // initialValue={props.modalData.type.name}
          rules={[
            {
              required: true,
              message: 'Please select a data record type.',
            },
          ]}
        >
          <Select
            placeholder={props.modalData.type.name}
            onChange={onTypeChange}
          >
            {types}
          </Select>
        </Form.Item> */}
        <Form.Item
          label="Latitude"
          name="latitude"
          initialValue={props.modalData.coordinates.latitude.toString()}
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
          initialValue={props.modalData.coordinates.longitude.toString()}
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
            {fields => {
              return (
                <div>
                  {props.modalData.fields.map(field => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        // label="Name"
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        initialValue={[field.name]}
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
                        // label="Value"
                        name={[field.name, 'value']}
                        fieldKey={[field.fieldKey, 'value']}
                        initialValue={[field.value]}
                        rules={[
                          {
                            required: true,
                            message: 'Missing field value',
                          },
                        ]}
                      >
                        <Input placeholder="Field Value" />
                      </Form.Item>
                    </Space>
                  ))}
                </div>
              );
            }}
          </Form.List>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={props.handleCancel}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditForm;
