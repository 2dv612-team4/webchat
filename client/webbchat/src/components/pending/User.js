import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction, IconButton, Tooltip } from 'react-mdl';

const User = ({ openChatt, user: {username, id}}) => (
  <ListItem>
    <ListItemContent >{username}</ListItemContent>
    <ListItemAction>
      <Tooltip label="Accept friend request" position="bottom">
        <IconButton
          name="add_circle"
          colored
          onClick={() => openChatt(id)} />
      </Tooltip>
      <Tooltip label="Reject friend request" position="bottom">
        <IconButton
          name="add_circle"
          colored
          onClick={() => openChatt(id)} />
      </Tooltip>
    </ListItemAction>
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  openChatt: PropTypes.func,
}

export default User;
