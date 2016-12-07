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

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    };
  }

  acceptChangePassword() {
    console.log(this.props.username);
    console.log(this.state.oldPassword);
    console.log(this.state.newPassword);
    console.log(this.state.repeatNewPassword);
  }

  closeChangePassword() {
    webchatEmitter.emit('change-password-settings', false);
  }

  oldPasswordInput(input){
    this.setState({oldPassword: input});
  }

  newPasswordInput(input){
    this.setState({newPassword: input});
  }

  repeatNewPassword(input){
    this.setState({repeatNewPassword: input});
  }

  render() {
    const changePassword = this.props.changePassword;
    if(changePassword){
      return (
        <div>PasswordField
          <p>Change password?</p>

          <PasswordField onInput={this.oldPasswordInput.bind(this)} passwordlabel='Old Password'  />
          <PasswordField onInput={this.newPasswordInput.bind(this)} passwordlabel='New Password' />
          <PasswordField onInput={this.repeatNewPassword.bind(this)} passwordlabel='Repeat New Password' />

          <Button raised colored ripple type='button'
            onClick={() => this.acceptChangePassword()}>Accept
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


/*

this.refs.oldpassword.inputRef.value,
this.refs.newpassword.inputRef.value,
this.refs.repeatnewpassword.inputRef.value
const username = this.props.username;



<PasswordField passwordlabel='Old Password'  />
<PasswordField passwordlabel='New Password' />
<PasswordField passwordlabel='Repeat New Password' />

<Button raised colored ripple type='button'
  onClick={() => this.acceptChangePassword(username, this, 'asd', 'asd')}>Accept
</Button>


<Textfield
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
