import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'


class Users extends Component {

  openChat(chatId){
    console.log('openChat for:', chatId);
    webchatEmitter.emit('join-chat-room', chatId);
    console.log('joinChatRoom should be emitted');
    webchatEmitter.emit('send-chat-message', 'test message');
  }

  removeFriend(username, chatId){
    console.log('removeFriend:', username);
    webchatEmitter.emit('remove-friend', {username, chatId});
  }

  render() {
    return (
      <List>
        {this.props.friends
            .filter((friend) => 
              friend.user.username.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
                .map((friend, i) => 
                  <User 
                    openChat={this.openChat.bind(this)}
                    removeFriend={this.removeFriend.bind(this)} 
                    user={friend.user}
                    chat={friend.chat} 
                    key={friend.user.username}/>)}
      </List>
    )
  }
}

export default connect((state) => ({
  friends: state.friends,
  filterQuery: state.userSearchQuery,
}), Users)
