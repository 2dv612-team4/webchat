import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'


class Users extends Component {

  openChat(chatId){
    this.props.setChatOpen(chatId);
  }

  removeFriend(username, chatId){
    webchatEmitter.emit('remove-friend', {username, chatId});
  }

  clearChatHistory(chatId){
    webchatEmitter.emit('clear-chat-history', chatId);
  }

  reportUser(username){
    webchatEmitter.emit('report-user-settings', true);
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
                    clearChatHistory={this.clearChatHistory.bind(this)} 
                    reportUser={this.reportUser.bind(this)}
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
  setChatOpen: state.setChatOpen,
}), Users)
