import React, { Component } from 'react';
import { Button, Menu, MenuItem } from 'react-mdl';
import Payment from './Payment/Payment';
import connect from '../../connect/connect'

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
  }

  payment(){
    this.setState({
      showComponent: true,
    });
  }

  other(username){
    console.log('Some other setting function:', username);
    // TODO: Implement other function, like password change
  }

  render() {
    //<Payment name={username} premium={isPremium} update={updateSnackbar}/>
    const username = this.props.username;
    const isPremium = this.props.isPremium;
    const updateSnackbar = this.props.updateSnackbar;
    return (
      <div>
        <Button raised accent name="SettingsButton" id={`menu_iconbutton_id_${username}`}>{username}</Button>
        <Menu align='right' target={`menu_iconbutton_id_${username}`} >
          <MenuItem
            onClick={() => this.payment()}
            >{this.state.showComponent ?
              <Payment name={username} premium={isPremium} update={updateSnackbar}/>:
              null}

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
  isPremium: state.isPremium,
  updateSnackbar: state.updateSnackbar,
}), Settings);
