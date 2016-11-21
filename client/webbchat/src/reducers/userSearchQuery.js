
const userSearchQuery = (state = '', action) => {
  switch(action.type){
  case 'SET_USER_SEARCH_QUERY':
    return action.query;
  default:
    return state;
  }
};

export default userSearchQuery;