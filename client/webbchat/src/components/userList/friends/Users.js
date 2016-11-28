import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';

class Users extends Component {
  openChat(username){
    console.log('openChat for:', username);
    // TODO: open chat
  }

  removeFriend(username){
    console.log('removeFriend:', username);
  }

  render() {
    return (   
      <List>
        {this.props.users
            .filter((user) => 
              user.username.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
                .map((user, i) => 
                  <User 
                    openChat={this.openChat.bind(this)}
                    removeFriend={this.removeFriend.bind(this)} 
                    user={user} 
                    key={user.username}/>)}
      </List>
    )
  }
}

export default Users;