import React, { PropTypes } from 'react';
import { ListItem, IconButton, Menu, MenuItem, ListItemAction, ListItemContent } from 'react-mdl';

const User = ({ openChat, removeFriend, user: {username}, chat: {_id} }) => (
  <ListItem icon="person" > 
    <ListItemContent
      onClick={() => openChat(_id)}>{username}</ListItemContent>
    <ListItemAction>
      <IconButton name="more_vert" id={`menu_iconbutton_id_${username}`}/>
      <Menu align="right" target={`menu_iconbutton_id_${username}`}>
        <MenuItem     
          onClick={() => openChat(_id)}>Open chat
        </MenuItem>
        <MenuItem 
          onClick={() => removeFriend(username, _id)}>Remove friend
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
}

export default User;