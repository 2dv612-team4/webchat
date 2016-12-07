import React, { Component } from 'react';
import { Button, Textfield } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect';
import PasswordField from './PasswordField';

class ChangePassword extends Component {

  /*componentWillMount(){
    webchatEmitter.on('update-premium-response-fail-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
    webchatEmitter.on('update-premium-response-success-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
  }*/

  acceptChangePassword(username, oldPassword, newPassword, repeatedNewPassword) {
    console.log(username)
    console.log(oldPassword)
    console.log(newPassword)
    console.log(repeatedNewPassword)
    /*if(isPremium){
      this.props.updateSnackbar({
        display: true,
        text: 'You already have premium!',
      });
      this.closeBuyPremium();
      return;
    }
    webchatEmitter.emit('update-premium', username);
    this.closeBuyPremium();*/
  }

  closeChangePassword() {
    webchatEmitter.emit('change-password-settings', false);
  }

  render() {
    const username = this.props.username;
    const changePassword = this.props.changePassword;
    if(changePassword){
      return (
        <div>PasswordField
          <p>Change password?</p>

          <PasswordField passwordlabel='Old Password' passwordref='oldpassword' />
          <PasswordField passwordlabel='New Password' passwordref='newpassword' />
          <PasswordField passwordlabel='Repeat New Password' passwordref='repeatnewpassword' />

          <Button raised colored ripple type='button'
            onClick={() => this.acceptChangePassword(username,
              this.refs.oldpassword.inputRef.value,
              this.refs.newpassword.inputRef.value,
              this.refs.repeatnewpassword.inputRef.value
            )}>Accept
          </Button>

          <Button raised accent ripple type='button'
            onClick={() => this.closeChangePassword()}>No
          </Button>
        </div>
      );
    }
    return null;
  }
}


/*<Textfield
  label="Old Password"
  floatingLabel
  required
  ref='oldpassword'
  type="password"
  style={{width: '100px'}}
/>

<Textfield
  label="New Password"
  floatingLabel
  required
  ref='newpassword'
  type="password"
  style={{width: '100px'}}
/>

<Textfield
  label="Repeat New Password"
  floatingLabel
  required
  ref='repeatnewpassword'
  type="password"
  style={{width: '100px'}}
/>

<form action="/" name="changePassword">
  <div>
    <label>Old Password:</label>
    <input type="password" name="oldPassword" required="true" id="oldPassword" />
  </div>
  <div>
    <label >New Password:</label>
    <input type="password" name="newPassword" required="true" id="newPassword" />
  </div>
  <div>
    <label >Repeat New password:</label>
    <input type="password" name="repeatNewPassword" required="true" id="repeatNewPassword" />
  </div>
  <div id="submitDiv">
    <Button raised colored ripple type='submit' value="changePassword"
      onClick={() => this.acceptChangePassword(username, this.state.oldPassword, this.state.newPassword, this.state.repeatNewPassword)}>Accept
    </Button>
  </div>
</form>
*/

export default connect((state) => ({
  username: state.username,
  changePassword: state.changePassword,
  updateSnackbar: state.updateSnackbar,
}), ChangePassword);
