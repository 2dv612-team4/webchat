import React, { PropTypes } from 'react';
import { ListItem, Button, Menu, MenuItem } from 'react-mdl';

const Setting = ({ payment, other, name: {username} }) => (
  <ListItem>
    <Button raised  accent name="SettingsButton" id={`menu_iconbutton_id_${username}`}>{username}</Button>
    <Menu target={`menu_iconbutton_id_${username}`} >
      <MenuItem
        onClick={() => payment(username)}
        >Pay For Premium To Remove Adds
      </MenuItem>
      <MenuItem
        onClick={() => other(username)}
        >Some Other Option
      </MenuItem>
    </Menu>
  </ListItem>
);

Setting.propTypes = {
  username: PropTypes.object,
  payment: PropTypes.func,
  other: PropTypes.func,
}

export default Setting;
