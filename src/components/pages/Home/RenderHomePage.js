import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Typography } from 'antd';

import '../../../styles/home.css';

// ant.design icons
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

function RenderHomePage(props) {
  // constants to support ant.design
  const { Header, Footer, Sider, Content } = Layout;
  const { Title } = Typography;

  const { userInfo, authService } = props;

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">
            <img src="./../../media/logo-320.png" alt="Eco-Soap Logo" />
          </div>
          <Menu mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/profile-list">Profiles Example</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/example-list">Example List of Items</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/datavis">Data Visualizations Example</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/">Main Dashboard</Link>
            </Menu.Item>
            <Button type="primary" onClick={() => authService.logout()}>
              Logout
            </Button>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Title>Hi {userInfo.name} Welcome to Labs Basic SPA</Title>
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
