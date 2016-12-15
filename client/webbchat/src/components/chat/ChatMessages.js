import React, { PropTypes } from 'react';

const ChatMessages = ({ messages, loggedInUsername }) => (
  <div className='chatMessagesWindow chatContainer'>
    {
      messages.map(({message, username}, i) => {
        const messageColor = username === loggedInUsername ? 'bubble right' : 'bubble left';
        return (
          <div key={i} className={messageColor}>
            <p>{message} 
              <br/>
              <i>{username}</i>
            </p>
            
          </div>)
      })
    }
  </div>
);

ChatMessages.propTypes = {
  messages: PropTypes.array,
  loggedInUsername: PropTypes.string,
}

export default ChatMessages;