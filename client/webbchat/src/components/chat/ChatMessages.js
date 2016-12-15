import React, { PropTypes } from 'react';

const ChatMessages = ({ messages, loggedInUsername}) => (
  <div className='chatMessagesWindow chatContainer'>
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
        else{//The following will be changed. It should not be a href but a button or something that downloads the file
          return (
          <div key={i} className={messageColor}>
          <p>
            {attachment.originalfilename}
            <br />
            {attachment.uniquefilename}
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