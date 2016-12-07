const buyPremium = (state = [], action) => {

  switch (action.type) {
  case 'BUY_PREMIUM':
    return action.buyPremium;
  default:
    return state;
  }
};

export default buyPremium;
