const isPremium = (state = [], action) => {

  switch (action.type) {
  case 'SET_IS_PREMIUM':
    return action.isPremium;
  default:
    return state;
  }
};

export default isPremium;
