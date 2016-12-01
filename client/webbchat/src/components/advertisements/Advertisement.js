import React, { Component } from 'react';
import adImage from './advertisement.png';
import connect from '../../connect/connect'

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

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);