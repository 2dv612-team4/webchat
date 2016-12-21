import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import webchatEmitter from '../../model/emitter';
import ChatMessages from './ChatMessages';
import connect from '../../connect/connect';
import ChatHeader from './ChatHeader';

import Dropzone from 'react-dropzone';

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

  onDrop(files) {
      files.forEach((file)=> {
          webchatEmitter.emit('upload-file', {file, chatId: this.props.chatOpen} );
      });
  }
  /*WIP FOR AUTOSCROLL http://stackoverflow.com/questions/26556436/react-after-render-code , http://stackoverflow.com/questions/270612/scroll-to-bottom-of-div*/
  componentDidMount(){
    let objDiv = document.getElementById("allChatMessages");
    if(objDiv != null){
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  render() {
    const chat = this.props.chat.find(a => a.id === this.props.chatOpen)
    if(!chat || !chat.messages){
      return null;
    }
    const messages = chat.messages;
    return (
      <div id="chatContent">
        <ChatHeader chat={chat}/>
            <div id="chatWindow">
              <ChatMessages messages={messages} loggedInUsername={this.props.username} />
            </div>
            <div id="chatInput">
              <Textfield
                className='inputChatMessage'
                label="Enter message"
                onChange={() => {}}
                onKeyPress={event => this.onInputBoxEnter(event)}
              />
              <Dropzone onDrop={this.onDrop.bind(this)} multiple={false} id="fileUpload">
                <div>Drop or click to upload file</div>
              </Dropzone>
          </div>
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
  addFile: state.addFile,
}), Chat);
