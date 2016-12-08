const chat = (state = [], action) => {
  switch (action.type) {
  case 'REMOVE_CHAT':
    return state.filter(chat => chat.id !== action.chatId);
  
  case 'ADD_CHAT':
    if(state.find(chat => chat.id === action.chatId)){
      return state;
    }
    const messages = action.messages.map(({message, user: {username}}) => ({
      message,
      username,
    }));

    return [...state, {
      id: action.chatId,
      messages: messages,
    }];
  case 'ADD_MESSAGE':
    return state.map(chat => {
      if(chat.id !== action.chatId){
        return chat;
      }
      return Object.assign({}, chat, {
        messages: [...chat.messages, {
          message: action.message,
          username: action.username,
        }],
      });
      
    });
  default:
    return state;
  }
};

export default chat;