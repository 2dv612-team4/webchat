import React, { PropTypes } from 'react';
import { ListItem, IconButton, Menu, MenuItem, ListItemAction, ListItemContent } from 'react-mdl';

const GroupChat = ({ openChat, leaveChat, clearChatHistory, chat: {id: chatId, name} }) => (
  <ListItem icon="person" > 
    <ListItemContent
      onClick={() => openChat(chatId)}>{name}</ListItemContent>
    <ListItemAction>
      <IconButton name="more_vert" id={`menu_iconbutton_id_${chatId}`}/>
      <Menu align="right" target={`menu_iconbutton_id_${chatId}`}>
        <MenuItem     
          onClick={() => openChat(chatId)}>Open chat
        </MenuItem>
        <MenuItem 
          onClick={() => leaveChat(chatId)}>Leave chat
        </MenuItem>
        <MenuItem 
          onClick={() => clearChatHistory(chatId)}>Clear chat history
        </MenuItem>
      </Menu>
    </ListItemAction>
    
  </ListItem>
);

GroupChat.propTypes = {
  chat: PropTypes.object,
  openChat: PropTypes.func,
  leaveChat: PropTypes.func,
  clearChatHistory: PropTypes.func,
}

export default GroupChat;