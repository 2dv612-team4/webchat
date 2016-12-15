// TODO: clean this

const chat = (state = [], action) => {
  switch (action.type) {
  case 'REMOVE_CHAT':
    return state.filter(chat => chat.id !== action.chatId);
  
  case 'ADD_CHAT':
    if(state.find(chat => chat.id === action.chatId)){
      return state;
    }
    const messages = action.messages.map(({message, user: {username}, attachment}) => ({
      message,
      username,
      attachment,
    }));

    return [...state, {
      id: action.chatId,
      messages,
      isGroupChat: action.isGroupChat,
      timestamp: action.timestamp,
      users: action.users,
      name: action.name,
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
          attachment: action.attachment,
        }],
      });

    });
  case 'UPDATE_CHAT': 
    return state.map(chat => {
      if(chat.id !== action.chatId){
        return chat;
      }

      const messages = action.messages.map(({message, user: {username}, attachment}) => ({
        message,
        username,
        attachment,
      }));

      return Object.assign({}, chat, {
        id: action.chatId,
        messages,
        isGroupChat: action.isGroupChat,
        timestamp: action.timestamp,
        users: action.users,
        name: action.name,
      });
    });
  case 'CLEAR_ALL_MESSAGES':
    return state.map(chat => {
      if(chat.id !== action.chatId){
        return chat;
      }

      return Object.assign({}, chat, {
        messages: [],
      });
    });

  default:
    return state;
  }
};

export default chat;