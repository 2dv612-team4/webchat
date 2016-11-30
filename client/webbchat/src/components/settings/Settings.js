import React, { Component } from 'react';
import { List } from 'react-mdl';
import Setting from './Setting';

class Settings extends Component {
  payment(username){
    console.log('Payment Method For:', username);
    // TODO: Make Payment
  }

  other(username){
    console.log('Some other setting function:', username);
    // TODO: Implement other function, like password change
  }

  render() {
  let uName = []
  let usernameObject = JSON.parse(JSON.stringify({
    username: this.props.settings
  }));
  uName.push(usernameObject);
    return (
      <List>
        {uName
          .map((name) =>
            <Setting
              payment={this.payment.bind(this)}
              other={this.other.bind(this)}
              name={name}
              key={name.username}/>)}
      </List>
    )
  }
}

export default Settings;
