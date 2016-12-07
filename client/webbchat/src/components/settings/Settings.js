import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import connect from '../../connect/connect';
import webchatEmitter from '../../model/emitter';


class Settings extends Component {

  payment(username){
    webchatEmitter.emit('buy-premium', true);
  }

  other(username){
    console.log('Some other setting function:', username);
    // TODO: Implement other function, like password change
  }

  render() {
    const username = this.props.username;
    return (
      <div>
        <Button raised accent name="SettingsButton" id={`menu_iconbutton_id_${username}`}>{username}</Button>
        <Menu align='right' target={`menu_iconbutton_id_${username}`} >
          <MenuItem
            onClick={() => this.payment(username)}
            >Pay For Premium To Remove Adds
          </MenuItem>
          <MenuItem
            onClick={() => this.other(username)}
            >Some Other Option
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default connect((state) => ({
  username: state.username,
}), Settings);
