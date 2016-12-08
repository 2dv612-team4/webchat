import React, { Component } from 'react';
import { Button } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'

class Payment extends Component {

  componentWillMount(){
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
  }

  giveUserPremium(username, isPremium) {
    if(isPremium){
      this.props.updateSnackbar({
        display: true,
        text: 'You already have premium!',
      });
      this.closeBuyPremium();
      return;
    }
    webchatEmitter.emit('update-premium', username);
    this.closeBuyPremium();
  }

  closeBuyPremium() {
    webchatEmitter.emit('buy-premium', false);
  }
  render() {
    const username = this.props.username;
    const isPremium = this.props.isPremium;
    const buyPremium = this.props.buyPremium;
    if(buyPremium){
      return (
        <div>
          <p>Do you want premium?</p>
          <Button id="settingsbuttonAccept" raised colored ripple type='button'
            onClick={() => this.giveUserPremium(username, isPremium)}>Yes
          </Button>
          <Button id="settingsbuttonDecline" raised accent ripple type='button'
            onClick={() => this.closeBuyPremium()}>No
          </Button>
        </div>
      );
    }
    return null;
  }
}

export default connect((state) => ({
  username: state.username,
  isPremium: state.isPremium,
  buyPremium: state.buyPremium,
  updateSnackbar: state.updateSnackbar,
}), Payment);
