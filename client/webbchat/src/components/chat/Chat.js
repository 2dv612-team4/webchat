import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import webchatEmitter from '../../model/emitter';
import ChatMessages from './ChatMessages';
import connect from '../../connect/connect';

class Chat extends Component {

  onInputBoxEnter(event){
    if(event.key === 'Enter'){
      this.onChatMessage(event.target.value);
      event.target.value = null;
    }
  }

  onChatMessage(message){
    if(message.trim() === '' || !message){
      return;
    }
    webchatEmitter.emit('send-chat-message', {message, chatId: this.props.chatOpen} );
  }

  render() {
    const chat = this.props.chat.find(a => a.id === this.props.chatOpen)
    if(!chat || !chat.messages){
      // TODO: return component saying chat is empty
      return null; 
    }
    const messages = chat.messages;

    return (
      <div>
        <ChatMessages messages={messages} loggedInUsername={this.props.username} />
        <Textfield
          onChange={() => {}}
          onKeyPress={event => this.onInputBoxEnter(event)}
          label="Enter message"
          rows={1}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  chatOpen: state.chatOpen,
  chat: state.chat,
  setChatOpen: state.setChatOpen,
  addMessage: state.addMessage,
  username: state.username,
}), Chat);
