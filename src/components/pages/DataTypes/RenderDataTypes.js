import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Typography } from 'antd';

import { Sidebar } from '../../common';
import { TypesList } from '../../DataTypes';

const RenderDataTypesPage = props => {
  const { Header, Footer, Content } = Layout;
  const { Title } = Typography;

  return (
    <div>
      <>
        <Layout>
          <Sidebar />
          <Layout>
            <Header>
              <Title> Data Types Console</Title>
            </Header>
            <Content>
              <TypesList />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    </div>
  );
};

export default RenderDataTypesPage;

//TODO: look into udating this propTypes code

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderDataTypesPage.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      url: PropTypes.string,
      thumbnailUrl: PropTypes.string,
    })
  ).isRequired,
};
