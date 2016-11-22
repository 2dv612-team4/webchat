import React, { Component } from 'react';
import { List, Snackbar } from 'react-mdl';
import User from './User';
import { sendFriendRequestTo } from '../../../model/DAL/dbUser';

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      displaySnackbar: false,
      snackbarText: '',
    }
  }

  snackbarClick(){
    this.setState({
      displaySnackbar: false,
      snackbarText: '',
    })
  }

  handleSnackbarTimeout(){
    this.setState({
      displaySnackbar: false,
      snackbarText: '',
    })
  }

  sendFriendRequest(name){
    sendFriendRequestTo(name)
      .then((result) => {
        console.log(result)
        if(result.status === 304){ 
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Friend request already sent!', 
          })
        }else if (result.status === 200){
          this.setState({
            displaySnackbar: true,
            snackbarText: 'Friend request sent', 
          })
        }
      })
      .catch(() => {
        
      });
  }

  render(){ 
    return (
      <div>
        <List>
          {this.props.users
              .map((user) => 
                <User 
                  onClick={this.sendFriendRequest.bind(this)}
                  user={user} 
                  key={user.username}/>)}
        </List>
        <Snackbar
          active={this.state.displaySnackbar}
          onClick={this.snackbarClick.bind(this)}
          onTimeout={this.handleSnackbarTimeout.bind(this)}
          action="Ok">{this.state.snackbarText}
        </Snackbar>
      </div>
    )
  }
}

export default Users; 