import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import connect from '../../../connect/connect'

import webchatEmitter from '../../../model/emitter';

class Users extends Component {

  componentWillMount(){
    webchatEmitter.on('friend-request-error', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message, 
      });
    });

    webchatEmitter.on('friend-request-success', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message, 
      });
    }); 
  }

  sendFriendRequest(name){
    webchatEmitter.emit('friend-request', name);
  }

  render(){ 
    return (
      <List>
        {this.props.users
            .map((user) => 
              <User 
                onClick={this.sendFriendRequest.bind(this)}
                user={user} 
                key={user.username}/>)}
      </List>
    )
  }
}

export default connect((state) => ({
  users: state.otherUsers,
  updateSnackbar: state.updateSnackbar,
}), Users); 