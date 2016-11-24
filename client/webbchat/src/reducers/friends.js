
const friends = (state = [], action) => {
  /**
   * TODO: 
   * - add friend action,
   * - remove friend action 
   * */
  switch (action.type) {
  case 'SET_INITIAL_FRIENDS':
    return action.friends;
  default:
    return state;
  }
};

export default friends;