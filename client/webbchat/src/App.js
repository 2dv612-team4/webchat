import React, { Component } from 'react';

import Search from './components/search/App'
import UserList from './components/userList/UserList'
import Logout from './components/logout/Logout'
import { Layout, Header, Content, Drawer, Navigation} from 'react-mdl';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div style={{height: '100vh', position: 'relative'}}>
          <Layout fixedHeader fixedDrawer>
              <Header title="Webchat">
              <Logout />
              </Header>
              <Drawer >
              <Navigation>
                <span><Search /></span>
                <span><UserList /></span>
              </Navigation>
                
              </Drawer>
              <Content>
                chat
              </Content>
          </Layout>
      </div>
    );
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    pending: state.pending,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const AppState = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppState;
