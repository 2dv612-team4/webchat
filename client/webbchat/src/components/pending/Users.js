import React, { Component } from 'react';
import { List, Snackbar } from 'react-mdl';
import User from './User';
import { acceptFriendRequest } from '../../model/DAL/dbUser';

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      displaySnackbar: false,
      snackbarText: '',
    }
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

  acceptFriendRequest(name){
  }

  render(){
    return (
      <div>
        <List>
          {this.props.users
              .map((user) =>
                <User
                  onClick={this.acceptFriendRequest.bind(this)}
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
