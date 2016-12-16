import React, { Component } from 'react';
import { List } from 'react-mdl';
import GroupChat from './GroupChat';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'


class Users extends Component {

  openChat(chatId){
    this.props.setChatOpen(chatId);
  }

  leaveChat(chatId){
    webchatEmitter.emit('leave-groupchat', chatId);
  }

  clearChatHistory(chatId){
    webchatEmitter.emit('clear-chat-history', chatId);
  }

  render() {
    return (
      <List>
        {this.props.chats
            .filter(chat => chat.isGroupChat)
            .filter(chat =>
              chat.name.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
                .map((chat, i) => 
                  <GroupChat 
                    openChat={this.openChat.bind(this)}
                    leaveChat={this.leaveChat.bind(this)}
                    clearChatHistory={this.clearChatHistory.bind(this)} 
                    chat={chat} 
                    key={chat.id}/>)}
      </List>
    )
  }
}

export default connect((state) => ({
  filterQuery: state.userSearchQuery,
  setChatOpen: state.setChatOpen,
  chats: state.chat,
}), Users)
