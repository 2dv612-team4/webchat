import React, { PropTypes } from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';

const ChatMessages = ({ messages, loggedInUsername }) => (
  <List className='chatMessagesWindow'>
    {
      messages.map(({message, username}, i) => {
        const messageColor = username === loggedInUsername ? 'chatmessageLoggedIn' : 'chatmessage';
        return (
          <ListItem key={i} className={messageColor} twoLine>
            <ListItemContent subtitle={username}>{message}</ListItemContent>
          </ListItem>)
      })
    }
  </List>
);

ChatMessages.propTypes = {
  messages: PropTypes.array,
  loggedInUsername: PropTypes.string,
}

export default ChatMessages;