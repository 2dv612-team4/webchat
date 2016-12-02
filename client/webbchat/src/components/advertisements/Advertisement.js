import React, { PropTypes } from 'react';
import adImage from './advertisement.png';
import connect from '../../connect/connect'

const Advertisement = ({ isPremium }) => {
  if(isPremium){
    return null;
  }
  return (<img src={(adImage)} alt='pesky ad'/>)
};

Advertisement.propTypes = {
  isPremium: PropTypes.bool,
}

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);;

