import React, { PropTypes } from 'react';
import connect from '../../connect/connect'

const verticalImage = '/images/vertical_advertisement.png';
const mobileImage = '/images/advertisement.png';

const Advertisement = ({ isPremium }) => {
  if(isPremium){
    return null;
  }
  // insert else if(mobileVersion) here, then use mobileImage. 
  return (<img src={verticalImage} id='verticalAd' alt='pesky ad'/>)
};

Advertisement.propTypes = {
  isPremium: PropTypes.bool,
}

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);;

