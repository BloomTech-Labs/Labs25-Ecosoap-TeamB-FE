import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Row } from 'antd';
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
        <Menu
          mode="inline"
          defaultSelectedKeys="1"
          selectedKeys={props.selectedKey}
        >
          <Menu.Item key="1" icon={<GlobalOutlined />}>
            <Link to="/" style={{ fontSize: '18px', fontWeight: '500' }}>
              Map
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<EnvironmentOutlined />}>
            <Link
              to="/datarecords"
              style={{ fontSize: '18px', fontWeight: '500' }}
            >
              Data Records
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DatabaseOutlined />}>
            <Link
              to="/datatypes"
              style={{ fontSize: '18px', fontWeight: '500' }}
            >
              Data Types
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link
              to="/createuser"
              style={{ fontSize: '18px', fontWeight: '500' }}
            >
              Create User
            </Link>
          </Menu.Item>
          <Row justify="center" style={{ marginTop: '30px' }}>
            <Button
              type="primary"
              onClick={() => authService.logout()}
              style={{ fontWeight: '600' }}
            >
              Logout
            </Button>
          </Row>
        </Menu>
      </Sider>
    </div>
  );
}
export default Sidebar;
