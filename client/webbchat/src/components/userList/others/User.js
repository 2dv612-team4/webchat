import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction, IconButton, Tooltip } from 'react-mdl';

const User = ({ onClick, user: {username} }) => (
  <ListItem>
    <ListItemContent >{username}</ListItemContent>
    <ListItemAction>
      <Tooltip label="Send friend request" position="bottom">
        <IconButton 
          name="add_circle" 
          colored
          onClick={() => onClick(username)} />
      </Tooltip>  
    </ListItemAction>
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
}

export default User;