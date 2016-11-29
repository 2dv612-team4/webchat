import React, { Component } from 'react';
import { List, Snackbar } from 'react-mdl';
import User from './User';
import webchatEmitter from '../../model/emitter';

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      displaySnackbar: false,
      snackbarText: '',
    }
  }

  componentWillMount(){
    webchatEmitter.on('friend-request-rejected', (message) => {
      this.setState({
        displaySnackbar: true,
        snackbarText: message, 
      })
    })
    webchatEmitter.on('friend-request-accepted', (message) => {
      this.setState({
        displaySnackbar: true,
        snackbarText: message, 
      })
    })
    webchatEmitter.on('new-pending', (message) => {
      this.setState({
        displaySnackbar: true,
        snackbarText: message, 
      })
    })
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
    webchatEmitter.emit('accept-friend-request', id);
  }

  rejectFriendRequest(id){
    console.log(this.props.users)
    webchatEmitter.emit('reject-friend-request', id);
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
