import React, { PropTypes } from 'react';
import connect from '../../connect/connect'

const mobileImage = '/images/advertisement.png';

const Advertisement = ({ isPremium }) => {
  if(isPremium){
    return null;
  }
  return (<img src={mobileImage} id='mobileAd' alt='pesky ad'/>)
};

Advertisement.propTypes = {
  isPremium: PropTypes.bool,
}

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);;
