import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import { sendFriendRequestTo } from '../../../model/DAL/dbUser';

class Users extends Component {

  sendFriendRequest(name){
    sendFriendRequestTo(name)
      .then((result) => {
        console.log(result)
        if(result.status === 304){
          /** 
           * TODO:
           * show notification
           *  - handle request already sent before
           * */ 
        }else if (result === 200){
          /**
           * TODO:
           * show notification
           */
        }
      })
      .catch(() => {
        // TODO: show error notification
      });
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