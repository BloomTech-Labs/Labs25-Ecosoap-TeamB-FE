import React, { useState } from 'react';

// Apollo imports
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// ant.design imports
import { DeleteOutlined } from '@ant-design/icons';
import { Typography, Table, Button, Input, Popconfirm, Form } from 'antd';

// Apollo Client queries and mutation
const RECORD_QUERY = gql`
  {
    records {
      id
      name
      type {
        id
        name
      }
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

const RecordsTable = () => {
  return (
    <>
      <h3>Table Here</h3>
    </>
  );
};

export default RecordsTable;
