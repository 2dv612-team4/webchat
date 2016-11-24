import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction, IconButton, Tooltip } from 'react-mdl';

const User = ({ rejectFriendRequest, acceptFriendRequest, user: {username, id}}) => (
  <ListItem>
    <ListItemContent >{username}</ListItemContent>
    <ListItemAction>
      <Tooltip label="Accept friend request" position="bottom">
        <IconButton
          name="add_circle"
          colored
          onClick={() => acceptFriendRequest(id)} />
      </Tooltip>
      <Tooltip label="Reject friend request" position="bottom">
        <IconButton
          name="remove_circle"
          colored
          onClick={() => rejectFriendRequest(id)} />
      </Tooltip>
    </ListItemAction>
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  acceptFriendRequest: PropTypes.func,
  rejectFriendRequest: PropTypes.func,
}

export default User;
