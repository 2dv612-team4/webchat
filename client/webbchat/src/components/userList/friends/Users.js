import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'


class Users extends Component {
  openChat(username){
    console.log('openChat for:', username);
    webchatEmitter.emit('join-chat-room', username);
    console.log('joinChatRoom should be emitted');
    webchatEmitter.emit('send-chat-message', 'test message');
    // TODO: open chat
  }

  removeFriend(username){
    console.log('removeFriend:', username);
    webchatEmitter.emit('remove-friend', username);
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

export default connect((state) => ({
  users: state.friends,
  filterQuery: state.userSearchQuery,
}), Users)
