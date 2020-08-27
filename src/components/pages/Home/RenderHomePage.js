import React from 'react';
import { Layout, Typography } from 'antd';
import { Sidebar } from '../../common';

function RenderHomePage(props) {
  // constants to support ant.design
  const { Header, Footer, Content } = Layout;
  const { Title } = Typography;

  const { userInfo } = props;

  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout style={{ minHeight: '100vh' }}>
          <Header>
            <Title>
              Hi
            </Title>
          </Header>
          <Content>
            <Title level={2}>Content</Title>
            <Title level={3}>H3</Title>
            <p>
              This is an example of a common example of how we'd like for you to
              approach components.
            </p>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}
export default RenderHomePage;
