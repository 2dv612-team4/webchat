import React, { PropTypes } from 'react';
import adImage from './advertisement.png';
import connect from '../../connect/connect'

const publicImage = '/images/advertisement.png';
const isLocal = window.location.href.match('localhost:3000');

const Advertisement = ({ isPremium }) => {
  if(isPremium){
    return null;
  }
  return (<img src={ isLocal ? adImage : publicImage } alt='pesky ad'/>)
};

Advertisement.propTypes = {
  isPremium: PropTypes.bool,
}

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);;

