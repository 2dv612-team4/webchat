
const otherUsers = (state = [], action) => {
  /**
   * TODO: 
   * - add usrs action,
   * - remove users action 
   * */  
  switch (action.type) {
  case 'SET_USERS':
    return action.users;    
  default:
    return state;
  }
  
};

export default otherUsers;