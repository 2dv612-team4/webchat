import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';


class Users extends Component {

  sendFriendRequest(name){
    // TODO: send friend requset
    console.log('send friend request to:', name)
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

export default Users; 