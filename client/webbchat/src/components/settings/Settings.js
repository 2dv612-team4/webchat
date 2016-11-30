import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';

class Settings extends Component {
  payment(username){
    console.log('Payment Method For:', username);
    // TODO: Make Payment
  }

  other(username){
    console.log('Some other setting function:', username);
    // TODO: Implement other function, like password change
  }

  render() {
    const username = this.props.username;
    return ( 
      <div>
        <Button raised  accent name="SettingsButton" id={`menu_iconbutton_id_${username}`}>{username}</Button>
        <Menu align='right' target={`menu_iconbutton_id_${username}`} >
          <MenuItem
            onClick={() => this.payment.bind(this, username)}
            >Pay For Premium To Remove Adds
          </MenuItem>
          <MenuItem
            onClick={() => this.other.bind(this, username)}
            >Some Other Option
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default Settings;
