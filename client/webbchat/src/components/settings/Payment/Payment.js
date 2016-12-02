import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';
import webchatEmitter from '../../../model/emitter';

class Payment extends Component {

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
  /*
  * Not in use
  */
  componentWillMount(){
    webchatEmitter.on('update-premium-response-fail-snackbar', (message) => {
      this.props.update({
        display: true,
        text: message,
      });
    });
    webchatEmitter.on('update-premium-response-success', (message) => {
      this.props.update({
        display: true,
        text: message,
      });
    });
  }

  giveUserPremium(username, premium) {
    if(premium){
      //Implement something better
      console.log("You already have premium!");
    }else {
      webchatEmitter.emit('update-premium', username);
    }
    this.handleCloseDialog();
  }

  render() {
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
  }
}

export default Payment;
