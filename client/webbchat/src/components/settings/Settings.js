import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import Payment from './Payment/Payment';

class Settings extends Component {

  payment(username){

  }

  other(username){
    console.log('Some other setting function:', username);
    // TODO: Implement other function, like password change
  }

  render() {
    const username = this.props.username;
    const isPremium = this.props.isPremium;
    const updateSnackbar = this.props.updateSnackbar;
    return (
      <div>
      <Payment name={username} premium={isPremium} update={updateSnackbar}/>
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

export default Settings;
