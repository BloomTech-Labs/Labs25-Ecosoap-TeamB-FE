import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';

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
            <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
          </Header>
          <Content>
            <h2>Content</h2>
            <p>
              This is an example of a common example of how we'd like for you to
              approach components.
            </p>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>

      {/* <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button type="primary" onClick={() => authService.logout()}>
            Logout
          </Button>
        </p>
      </div> */}
    </div>
  );
}
export default RenderHomePage;
