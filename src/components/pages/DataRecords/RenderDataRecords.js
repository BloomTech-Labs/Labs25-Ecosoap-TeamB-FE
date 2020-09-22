import React from 'react';
// import PropTypes from 'prop-types';
import { Layout, Typography } from 'antd';

import { Sidebar } from '../../common';
import { RecordsTable } from '../../DataRecordTable';

const RenderDataTypesPage = props => {
  const { Header, Content } = Layout;
  const { Title } = Typography;

  return (
    <div>
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar selectedKey={'2'} />
          <Layout>
            <Header>
              <Title style={{ padding: '20px 0' }}> Data Records Console</Title>
            </Header>
            <Content>
              <RecordsTable />
            </Content>
          </Layout>
        </Layout>
      </>
    </div>
  );
};

export default RenderDataTypesPage;
