import React, { Component } from 'react';

import Search from './components/search/App'
import UserList from './components/userList/UserList'
import Logout from './components/logout/Logout'
import Pending from './components/pending/App'
import Settings from './components/settings/App'

import './App.css';
import { Layout, Header, Content, Grid, Cell} from 'react-mdl';

class App extends Component {

  render() {
    return (
      <div style={{height: '100vh', position: 'relative'}}>
          <Layout fixedHeader>
              <Header title="Webchat">
                <Settings />
                <Logout />
              </Header>
              <Content>
                <div style={{ margin: 'auto'}}>
                  <Grid className="demo-grid-ruler" >
                    <Cell col={2} style={{ minWidth: '200px'}} >
                      <Search />
                      <UserList />
                    </Cell>
                    <Cell col={10} style={{ margin: '2px'}}>CHAT</Cell>
                  </Grid>
                </div>
                <div style={{ margin: 'auto'}}>
                <Grid className="demo-grid-ruler" >
                <Cell col={10} style={{ margin: '2px'}}>Requests</Cell>
                  <Cell col={2} style={{ minWidth: '200px'}} >
                    <Pending />
                  </Cell>
                </Grid>
                </div>
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
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionsCreators, dispatch);

const AppState = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppState;
