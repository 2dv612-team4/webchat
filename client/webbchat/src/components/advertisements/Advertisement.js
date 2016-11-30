import React, { Component } from 'react';


class Advertisement extends Component {
  render() {
    const isPremium = this.props.isPremium;
    if(isPremium)
    {
      return (<div></div>);
    }

    return ( 
      <div>
        <img src='/images/advertisement.png' alt='pesky ad'
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'blue',
          border: '3px solid black',
          zIndex: 9999,
          display: 'block',
        }}
        />
        <div style={{background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}></div>
        <p>pelle gillar att se ads</p>
      </div>
    )
  }
}

export default Advertisement;
