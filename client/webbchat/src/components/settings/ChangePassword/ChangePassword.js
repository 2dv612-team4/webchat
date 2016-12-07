import React, { Component } from 'react';
import { Button, Textfield } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect';
import PasswordField from './PasswordField';

class ChangePassword extends Component {

  componentWillMount(){
    webchatEmitter.on('update-password-response-fail-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
    webchatEmitter.on('update-password-response-success-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    };
  }

  acceptChangePassword() {
    const username = this.props.username;
    const oldPassword = this.state.oldPassword;
    const newPassword = this.state.newPassword;
    const repeatNewPassword = this.state.repeatNewPassword;

    if(oldPassword !== "" && newPassword !== "" && repeatNewPassword !== "" &&
      oldPassword !== newPassword &&
      newPassword == repeatNewPassword){
        webchatEmitter.emit('update-password', username, oldPassword, newPassword);
        this.closeChangePassword();
        return;
      }
      this.props.updateSnackbar({
        display: true,
        text: 'Password not accepted, try again!',
      });
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

export default connect((state) => ({
  username: state.username,
  changePassword: state.changePassword,
  updateSnackbar: state.updateSnackbar,
}), ChangePassword);
