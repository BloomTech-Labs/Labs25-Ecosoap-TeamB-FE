import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';
import { Layout } from 'antd';
import './Map.css';

import { Sidebar } from '../../common';

const ExampleList = props => {
  const { Header, Footer, Content } = Layout;

  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <div>
      {authState.isAuthenticated && !userInfo && (
        <props.LoadingComponent message="Fetching..." />
      )}
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar selectedKey={'1'} />
          <Layout>
            <Header>
              <h2>Map</h2>
              <iframe
                src="https://api.mapbox.com/styles/v1/vlahorba/ckeyop2vy09aq19mvsb38yg2v.html?fresh=true&title=view&access_token=pk.eyJ1IjoidmxhaG9yYmEiLCJhIjoiY2s4ZjQ0d20yMDBlYTNscW9lZG0zNXU5ayJ9.ZQKJxY3FUYlxPyCuOqOxMA"
                frameborder="0"
                title="map"
              ></iframe>
            </Header>
            <Content></Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    </div>
  );
};

export default ExampleList;

//TODO: look into udating this propTypes code

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
ExampleList.propTypes = {
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

// import React from 'react';
// import './Map.css';
// import { Sidebar } from '../../common';
// import { TypesList } from '../../DataTypeTable';
//
// import { getExampleData } from '../../../api';
//
// import { List } from '../../common';
// import RenderExampleListPage from './RenderExampleListPage';
//
// // Here is an example of using our reusable List component to display some list data to the UI.
// const ExampleList = () => {
//   return (
//     <div>
//       <h1>Kaban</h1>
//
//       <iframe
//         src="https://api.mapbox.com/styles/v1/vlahorba/ckeyop2vy09aq19mvsb38yg2v.html?fresh=true&title=view&access_token=pk.eyJ1IjoidmxhaG9yYmEiLCJhIjoiY2s4ZjQ0d20yMDBlYTNscW9lZG0zNXU5ayJ9.ZQKJxY3FUYlxPyCuOqOxMA"
//         frameborder="0"
//       ></iframe>
//     </div>
//   );
// };
//
// export default ExampleList;
