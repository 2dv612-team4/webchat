import React, { PropTypes } from 'react';
import { ListItem } from 'react-mdl';

const User = ({ openChatt, user: {username} }) => (
  <ListItem 
    onClick={() => openChatt(username)} icon="person">
      {username}
  </ListItem>
);

User.propTypes = {
  user: PropTypes.object,
  openChatt: PropTypes.func,
}

export default User;

