import React, { Component } from 'react';
import { List } from 'react-mdl';
import User from './User';

class Users extends Component {
  openChatt(userId){
    console.log('userId', userId);
  }

  render() {
    return (   
      <List>
        {this.props.users
            .filter((user) => 
              user.username.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
                .map((user, i) => 
                  <User 
                    openChatt={this.openChatt.bind(this)} 
                    user={user} 
                    key={user.username}/>)}
      </List>
    )
  }
}

export default Users;