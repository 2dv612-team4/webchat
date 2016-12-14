import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import webchatEmitter from '../../model/emitter';
import ChatMessages from './ChatMessages';
import connect from '../../connect/connect';
import ChatHeader from './ChatHeader';
import DropZone from 'react-dropzone';

class Chat extends Component {

  onInputBoxEnter(event){
    if(event.key === 'Enter' && event.shiftKey){
      return; 
    }

    if(event.key === 'Enter'){
      event.preventDefault();
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
      return null; 
    }
    const messages = chat.messages;
    return (
      <div>
        <ChatHeader chat={chat}/>
        <ChatMessages messages={messages} loggedInUsername={this.props.username} />
        <Textfield
          className='inputChatMessage'
          onChange={() => {}}
          onKeyPress={event => this.onInputBoxEnter(event)}
          label="Enter message"
          rows={1}
        />
        <DropZone onDrop={this.onDrop}>
          <div>Drop files or click to upload.</div>
        </DropZone>
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
