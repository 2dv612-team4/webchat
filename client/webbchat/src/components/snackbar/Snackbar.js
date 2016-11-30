import React, { Component } from 'react';
import { Snackbar } from 'react-mdl';

class GeneralSnackbar extends Component {

  updateSnackbar(){
    this.props.updateSnackbar({
      display: false,
      text: '',
    })
  }

  snackbarClick(){
    this.updateSnackbar();
  }

  handleSnackbarTimeout(){
    this.updateSnackbar();
  }

  render(){ 
    return (
      <Snackbar
        active={this.props.snackbar.display}
        onClick={this.snackbarClick.bind(this)}
        onTimeout={this.handleSnackbarTimeout.bind(this)}
        action="Close">{this.props.snackbar.text}
      </Snackbar>
    )
  }
}

export default GeneralSnackbar; 