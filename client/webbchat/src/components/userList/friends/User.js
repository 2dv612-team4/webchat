import React, { PropTypes } from 'react';
import { ListItem } from 'react-mdl';

const User = ({ openChat, user: {username} }) => (
  <ListItem 
    onClick={() => openChat(username)} icon="person">
      {username}
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  openChat: PropTypes.func,
}

export default User;

