import React, { Component } from 'react';
import { List, Snackbar } from 'react-mdl';
import User from './User';
import { sendFriendRequestTo } from '../../../model/DAL/dbUser';
import webchatEmitter from '../../../model/emitter';

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      displaySnackbar: false,
      snackbarText: '',
    }
  }

  componentWillMount(){
    webchatEmitter.on('friend-request-error', (message) => {
      this.setState({
        displaySnackbar: true,
        snackbarText: message, 
      })
    });

    webchatEmitter.on('friend-request-success', (message) => {
      this.setState({
        displaySnackbar: true,
        snackbarText: message, 
      })
    }); 
  }

  snackbarClick(){
    this.setState({
      displaySnackbar: false,
      snackbarText: '',
    })
  }

  handleSnackbarTimeout(){
    this.setState({
      displaySnackbar: false,
      snackbarText: '',
    })
  }

  sendFriendRequest(name){
    webchatEmitter.emit('friend-request', name);
  }

  render(){ 
    return (
      <div>
        <List>
          {this.props.users
              .map((user) => 
                <User 
                  onClick={this.sendFriendRequest.bind(this)}
                  user={user} 
                  key={user.username}/>)}
        </List>
        <Snackbar
          active={this.state.displaySnackbar}
          onClick={this.snackbarClick.bind(this)}
          onTimeout={this.handleSnackbarTimeout.bind(this)}
          action="Ok">{this.state.snackbarText}
        </Snackbar>
      </div>
    )
  }
}

export default Users; 