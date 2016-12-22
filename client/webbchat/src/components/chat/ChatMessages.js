import React, { PropTypes } from 'react';

const ChatMessages = ({ messages, loggedInUsername}) => (
  <div className='chatMessagesWindow chatContainer' id='allChatMessages'>
    {
      messages.map(({message, username, attachment}, i) => {
        const messageColor = username === loggedInUsername ? 'bubble right' : 'bubble left';
        if(!attachment){
        return (
          <div key={i} className={messageColor}>
            <p>{message}
              <br/>
              <i>{username}</i>
            </p>

          </div>)}
        else{
          const link = '/download/'+attachment.uid;
          return (
          <div key={i} className={messageColor}>
          <p>
            <a href={link}>{attachment.filename}</ a>
            <br/>
            <i>{username}</i>
          </p>
          </div>)}
      })
    }
  </div>
);

ChatMessages.propTypes = {
  messages: PropTypes.array,
  loggedInUsername: PropTypes.string,
}

export default ChatMessages;
