import React, { PropTypes } from 'react';
import { ListItem, IconButton, Menu, MenuItem } from 'react-mdl';

const User = ({ openChat, removeFriend, user: {username} }) => (
  <ListItem icon="person" > 
    <div
      onClick={() => openChat(username)}>
    {username}
    </div>
    <IconButton name="more_vert" id={`menu_iconbutton_id_${username}`}/>
    <Menu target={`menu_iconbutton_id_${username}`} >
      <MenuItem     
        onClick={() => openChat(username)}
        >Open chat
      </MenuItem>
      <MenuItem 
        onClick={() => removeFriend(username)}
        >Remove friend
      </MenuItem>
    </Menu>
    

  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  openChat: PropTypes.func,
  removeFriend: PropTypes.func,
}

export default User;