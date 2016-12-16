import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import connect from '../../connect/connect';
import webchatEmitter from '../../model/emitter';


class Settings extends Component {

  payment(){
    webchatEmitter.emit('buy-premium', true);
  }

  changePassword(username){
    webchatEmitter.emit('change-password-settings', true);
  }

  deleteAccount(username){
    webchatEmitter.emit('delete-account', username);
  }

  render() {
    const username = this.props.username;
    return (
      <div>
        <Button raised name="SettingsButton" id={`menu_iconbutton_id_${username}`}>{username}</Button>
        <Menu align='right' target={`menu_iconbutton_id_${username}`} >
          <MenuItem
            onClick={() => this.payment()}
            >Pay For Premium To Remove Adds
          </MenuItem>
          <MenuItem
            onClick={() => this.changePassword(username)}
            >Change Password
          </MenuItem>
          <MenuItem
            onClick={() => this.deleteAccount(username)}
            >Delete Account
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default connect((state) => ({
  username: state.username,
}), Settings);
