import React, { Component } from 'react';

import Search from './components/search/Search'
import UserList from './components/userList/UserList'
import Logout from './components/logout/Logout'
import Settings from './components/settings/Settings'
import Payment from './components/settings/Payment/Payment'
import ChangePassword from './components/settings/ChangePassword/ChangePassword'
import Snackbar from './components/snackbar/Snackbar'
import Advertisement from './components/advertisements/Advertisement'
import MobileAd from './components/advertisements/AdvertisementMobile'
import Chat from './components/chat/Chat'
import NewGroupChat from './components/groupChatCreator/NewGroupChat'
import GroupChatUser from './components/groupChatCreator/Users'
import ReportUser from './components/userList/friends/ReportUser'

import { Layout, Header, Content, Drawer, Navigation, Grid, Cell} from 'react-mdl';
//import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      createGroupChat: false,
    }
  }

  createGroupChat(){
    this.state.createGroupChat ?
      this.setState({createGroupChat: false}) :
      this.setState({createGroupChat: true});
  }

  render() {
    return (
      <div style={{height: '100vh', position: 'relative'}}>
          <Layout fixedHeader fixedDrawer>
              <Header title="Webchat" id="header">
                <Settings />
                <Logout />
              </Header>
              <Drawer>
              <Navigation>
                <NewGroupChat onCreate={this.createGroupChat.bind(this)}/>
                <span id="searchField"><Search/></span>
                {
                  this.state.createGroupChat ?
                  (<GroupChatUser/>) :
                  (
                    <span><UserList/></span>
                  )
                }

              </Navigation>
              </Drawer>
                <Content id="contentArea">
                <Cell id="premiumConfirm" col={2} shadow={2}>
                  <Payment />
                </Cell>
                <Cell id="passwordChange" col={2} shadow={2}>
                  <ChangePassword />
                </Cell>
                <Cell id="userReport" col={2} shadow={2}>
                  <ReportUser />
                </Cell>
                <Grid noSpacing={true}>
                    <Cell id="Chat" col={10} phone={12}>
                      <Chat />
                    </Cell>
                  <Cell id="advert" col={2} hidePhone={true}>
                    <Advertisement/>
                  </Cell>
                  <Cell id="mobileAd" phone={12} hideDesktop={true} hideTablet={true}>
                    <MobileAd/>
                  </Cell>
                </Grid>
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
