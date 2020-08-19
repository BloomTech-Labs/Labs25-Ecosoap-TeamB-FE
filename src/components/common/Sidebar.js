import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';

// import '../../../styles/home.css';

// ant.design icons
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

function Sidebar(props) {
  // constants to support ant.design
  const { Sider } = Layout;

  const { authService } = props;

  return (
    <div>
      {/* <Layout style={{ minHeight: '100vh' }}> */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ minHeight: '100vh' }}
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

      {/* </Layout> */}
    </div>
  );
}
export default Sidebar;
