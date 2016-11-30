import React, { Component } from 'react';

import Search from './components/search/App'
import UserList from './components/userList/UserList'
import Logout from './components/logout/Logout'
import Settings from './components/settings/App'
import Snackbar from './components/snackbar/App'
import { Layout, Header, Content, Drawer, Navigation} from 'react-mdl';

import './App.css';

class App extends Component {

  render() {
    return (
      <div style={{height: '100vh', position: 'relative'}}>
          <Layout fixedHeader fixedDrawer>
              <Header title="Webchat">
                <Settings />
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
          <Snackbar/>
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
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const AppState = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppState;
