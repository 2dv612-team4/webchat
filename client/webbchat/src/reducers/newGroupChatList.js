const newGroupChatList = (state = [], action) => {

  switch (action.type) {
  case 'ADD_TO_NEW_GROUPCHAT':
    if(state.find(username => username === action.username)){
      return state;
    }

    return [...state, action.username];
  case 'REMOVE_FROM_NEW_GROUPCHAT':
    return state.filter(username => username !== action.username)
  default:
    return state;
  }
};

export default newGroupChatList;
