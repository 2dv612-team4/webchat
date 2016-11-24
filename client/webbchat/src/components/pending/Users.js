import React, { Component } from 'react';
import { List, Snackbar } from 'react-mdl';
import User from './User';
import { acceptFriendRequest, rejectFriendRequest } from '../../model/DAL/dbUser';

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

  acceptFriendRequest(id){
    acceptFriendRequest(id)
      .then((result) => {
        if(result.status === 304){ 
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Error when accepting friend request!', 
          })
        }else if (result.status === 200){
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Accepted friend request', 
          })
        }
      })
      .catch(() => {
      });
  }

  rejectFriendRequest(id){
    rejectFriendRequest(id)
      .then((result) => {
        if(result.status === 304){ 
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Error when rejecting friend request!', 
          })
        }else if (result.status === 200){
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Rejected friend request', 
          })
        }
      })
      .catch(() => {
      });
  }

  render(){
    return (
      <div>
        <List>
          {this.props.users
              .map((user) =>
                <User
                  acceptFriendRequest={this.acceptFriendRequest.bind(this)}
                  rejectFriendRequest={this.rejectFriendRequest.bind(this)}
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
