import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import webchatEmitter from '../../../model/emitter';

class Users extends Component {

  componentWillMount(){
    webchatEmitter.on('friend-request-rejected', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message, 
      });
    })
    webchatEmitter.on('friend-request-accepted', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message, 
      });
    })
    webchatEmitter.on('new-pending', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message, 
      });
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
      <List>
        {this.props.users
            .map((user) =>
              <User
                acceptFriendRequest={this.acceptFriendRequest.bind(this)}
                rejectFriendRequest={this.rejectFriendRequest.bind(this)}
                user={user}
                key={user.username}/>)}
      </List>
    )
  }
}

export default Users;
