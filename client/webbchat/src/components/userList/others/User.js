import React, { PropTypes } from 'react';
import { ListItem, ListItemContent, ListItemAction, IconButton } from 'react-mdl';

const User = ({ onClick, user: {username} }) => (
  <ListItem>
    <ListItemContent >{username}</ListItemContent>
    <ListItemAction>
      <IconButton 
        name="add_circle" 
        colored
        onClick={() => onClick(username)} />
    </ListItemAction>
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  openChatt: PropTypes.func,
}

export default User;