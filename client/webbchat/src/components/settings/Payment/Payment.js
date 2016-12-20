import React, { Component } from 'react';
import { Button } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';
import connect from '../../../connect/connect'

class Payment extends Component {

<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  componentWillMount(){
=======
  componentWillMount(){
    webchatEmitter.on('update-premium-response-fail-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
>>>>>>> 8515d43aa12798acbb65605192df7c96227222b8
    webchatEmitter.on('update-premium-response-success-snackbar', (message) => {
      this.props.updateSnackbar({
        display: true,
        text: message,
      });
    });
  }

<<<<<<< HEAD
  giveUserPremium(username, premium) {
    this.handleCloseDialog();
    if(premium){
      this.props.update({
        display: true,
        text: "You already have premium!",
      });
      return;
    }
    webchatEmitter.emit('update-premium', username);
=======
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
>>>>>>> 8515d43aa12798acbb65605192df7c96227222b8
  }

  closeBuyPremium() {
    webchatEmitter.emit('buy-premium', false);
  }
  render() {
<<<<<<< HEAD
    const username = this.props.name;
    const premium = this.props.premium;
    return (
      <div>
        <Button colored onClick={() => this.handleOpenDialog()} raised ripple>Show Dialog</Button>
        <Dialog open={this.state.openDialog}>
          <DialogTitle>Premium</DialogTitle>
          <DialogContent>
            <p>Do you want to buy premium!</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={() => this.giveUserPremium(username, premium)}>Yes</Button>
            <Button type='button' onClick={() => this.handleCloseDialog()}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
=======
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
          <Button id="settingsbuttonDecline" raised ripple type='button'
            onClick={() => this.closeBuyPremium()}>No
          </Button>
        </div>
      );
    }
    return null;
>>>>>>> 8515d43aa12798acbb65605192df7c96227222b8
  }
}

export default connect((state) => ({
  username: state.username,
  isPremium: state.isPremium,
  buyPremium: state.buyPremium,
  updateSnackbar: state.updateSnackbar,
}), Payment);
