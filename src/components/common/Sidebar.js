import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useOktaAuth } from '@okta/okta-react';

import './../../styles/sideBar.css';

// ant.design icons
import {
  EnvironmentOutlined,
  UserOutlined,
  GlobalOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

function Sidebar(props) {
  // constants to support ant.design
  const { Sider } = Layout;

  const { authService } = useOktaAuth();

  return (
    <div>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ minHeight: '100%' }}
      >
        <div className="logo">
          <img src="./../../media/logo-320.png" alt="Eco-Soap Logo" />
        </div>
        <Menu mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/profile-list">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<GlobalOutlined />}>
            <Link to="/map">Map Console</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<EnvironmentOutlined />}>
            <Link to="/datarecords">Data Records Console</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DatabaseOutlined />}>
            <Link to="/datatypes">Data Types Console</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/">Main Dashboard</Link>
          </Menu.Item>
          <Button type="primary" onClick={() => authService.logout()}>
            Logout
          </Button>
        </Menu>
      </Sider>
    </div>
  );
}
export default Sidebar;
