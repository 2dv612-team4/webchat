const chat = (state = '', action) => {
  switch (action.type) {
  case 'SET_CHAT_OPEN':
    return action.chatId;
  default:
    return state;
  }
};

export default chat;