import React, { PropTypes } from 'react';
import { ListItem, IconButton, Menu, MenuItem, ListItemAction, ListItemContent } from 'react-mdl';

const User = ({ openChat, removeFriend, clearChatHistory, user: {username}, chat: {_id: chatId}, reportUser }) => (
  <ListItem icon="person" > 
    <ListItemContent
      onClick={() => openChat(chatId)}>{username}</ListItemContent>
    <ListItemAction>
      <IconButton name="more_vert" id={`menu_iconbutton_id_${username}`}/>
      <Menu align="right" target={`menu_iconbutton_id_${username}`}>
        <MenuItem     
          onClick={() => openChat(chatId)}>Open chat
        </MenuItem>
        <MenuItem 
          onClick={() => removeFriend(username, chatId)}>Remove friend
        </MenuItem>
        <MenuItem 
          onClick={() => clearChatHistory(chatId)}>Clear chat history
        </MenuItem>
        <MenuItem 
          onClick={() => reportUser(username)}>Report user
        </MenuItem>
      </Menu>
    </ListItemAction>
    
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  chat: PropTypes.object,
  openChat: PropTypes.func,
  removeFriend: PropTypes.func,
  clearChatHistory: PropTypes.func,
  reportUser: PropTypes.func,
}

export default User;