import React, { PropTypes } from 'react';
import connect from '../../connect/connect'
const publicImage = '/images/advertisement.png';

const Advertisement = ({ isPremium }) => {
  if(isPremium){
    return null;
  }
  return (<img src={publicImage} alt='pesky ad'/>)
};

Advertisement.propTypes = {
  isPremium: PropTypes.bool,
}

export default connect((state) => ({
  isPremium: state.isPremium,
}), Advertisement);;

