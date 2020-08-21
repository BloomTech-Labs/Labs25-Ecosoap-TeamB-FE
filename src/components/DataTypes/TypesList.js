import React from 'react';
import Type from './Type';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Table } from 'antd';

const TypeList = () => {
  const TYPE_QUERY = gql`
    {
      types {
        id
        name
      }
    }
  `;
  //////////////////////////
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      //   {
      //     text: 'Submenu',
      //     value: 'Submenu',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ['descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   filters: [
    //     {
    //       text: 'London',
    //       value: 'London',
    //     },
    //     {
    //       text: 'New York',
    //       value: 'New York',
    //     },
    //   ],
    //   filterMultiple: false,
    //   onFilter: (value, record) => record.address.indexOf(value) === 0,
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  // ReactDOM.render(
  //   <Table columns={columns} dataSource={data} onChange={onChange} />,
  //   mountNode
  // );
  ///////////////////////////

  return (
    <div>
      <h2>Type List Comp</h2>
      <div>
        {/* <Query query={TYPE_QUERY}>
          {() => linksToRender.map(link => <Type key={link.id} link={link} />)}
        </Query> */}
        <Table columns={columns} dataSource={data} onChange={onChange} />
        <Query query={TYPE_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Fetching</div>;
            }
            if (error) {
              // Check if error response is JSON
              try {
                JSON.parse(error.networkError.bodyText);
              } catch (e) {
                // If not replace parsing error message with real one
                error.networkError.message = error.networkError.bodyText;
              }
              return <div>{error.networkError.message}</div>;
            }
            const typesToRender = data.types;
            console.log('Data', data);

            return (
              <div>
                {typesToRender.map(type => (
                  <Type key={type.id} type={type} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default TypeList;
