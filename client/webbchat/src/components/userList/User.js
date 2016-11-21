import React, { PropTypes } from 'react';
import { ListItemContent, ListItem } from 'react-mdl';

const SearchBox = ({ openChatt, user: {username, id} }) => (
  <ListItem>
    <ListItemContent onClick={() => openChatt(id)} icon="person">{username}</ListItemContent>
  </ListItem>
);

SearchBox.propTypes = {
  user: PropTypes.object,
  openChatt: PropTypes.func,
}

export default SearchBox;

