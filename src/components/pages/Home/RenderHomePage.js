import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { Sidebar } from '../../common';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import './RenderHomePage.css';

const mutation = gql`
  mutation register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      success
      error
    }
  }
`;

function RenderHomePage(props) {
  // constants to support ant.design
  const { Header, Footer, Content } = Layout;
  const { Title } = Typography;
  const { userInfo } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createType] = useMutation(mutation, {
    variables: { email, password },
  });
  return (
    <div>
      <Layout>
        <Sidebar selectedKey={'4'} />
        <Layout style={{ minHeight: '100vh' }}>
          <Header>
            <Title>Hi {userInfo.name}, you can add a new user</Title>
          </Header>
          <Content>
            <div className="input__form">
              <input
                placeholder="email"
                className="input_example"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                className="input_example"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
              <button className="add__button" onClick={createType}>
                Add user
              </button>
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}
export default RenderHomePage;
