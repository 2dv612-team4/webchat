import React, { Component } from 'react';
import adImage from './advertisement.png';


class Advertisement extends Component {
  render() {
    const isPremium = this.props.isPremium;
    if(isPremium){
      return (<div></div>);
    }

    return ( 
        <img src={(adImage)} alt='pesky ad'/>
    )
  }
}

export default Advertisement;
