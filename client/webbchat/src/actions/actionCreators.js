
export const setInitialFriends = (friends) => {
  return {
    type: 'SET_INITIAL_FRIENDS',
    friends,
  };
};

export const setQuery = (query) => {
  return {
    type: 'SET_USER_SEARCH_QUERY',
    query,
  };
};

export const setOtherUsers = (users) => {
  return {
    type: 'SET_USERS',
    users,
  };
};

export const setPendingRequests = (pending) => {
  return {
    type: 'SET_PENDING_REQUESTS',
    pending,
  };
};

export const setUsernameRequests = (username) => {
  return {
    type: 'SET_USERNAME_REQUESTS',
    username,
  };
};

export const updateSnackbar = (snackbar) => {
  return {
    type: 'UPDATE_SNACKBAR',
    snackbar,
  };
};

export const setIsPremium = (isPremium) => {
  return {
    type: 'SET_IS_PREMIUM',
    isPremium,
  };
};

export const buyAdPremium = (buyPremium) => {
  return {
    type: 'BUY_PREMIUM',
    buyPremium,
  };
};

export const addMessage = (chatId, username, message, attachment) => {
  return {
    type: 'ADD_MESSAGE',
    chatId, 
    message, 
    username,
    attachment,
  };
};

export const addChat = ({ _id, messages, isGroupChat, timestamp, users, name }) => {
  return {
    type: 'ADD_CHAT',
    chatId: _id,
    messages,
    isGroupChat,
    timestamp,
    users,
    name,
  };
};

export const updateChat = ({ _id, messages, isGroupChat, timestamp, users, name }) => ({
  type: 'UPDATE_CHAT',
  chatId: _id,
  messages,
  isGroupChat,
  timestamp,
  users,
  name,
});

export const removeChat = (chatId) => {
  return {
    type: 'REMOVE_CHAT',
    chatId,
  };
};

export const setChatOpen = (chatId) => {
  return {
    type: 'SET_CHAT_OPEN',
    chatId,
  };
};


export const changeUserPassword = (changePassword) => {
  return {
    type: 'CHANGE_PASSWORD',
    changePassword,
  };
};

export const reportUserMisconduct = (reportUser) => {
  return {
    type: 'REPORT_USER',
    reportUser,
  };
};

export const clearAllMessages = (chatId) => ({
  type: 'CLEAR_ALL_MESSAGES',
  chatId,
});

export const addToNewGroupchat = (username) => ({
  type: 'ADD_TO_NEW_GROUPCHAT',
  username,
});

export const removeFromNewGroupchat = (username) => ({
  type: 'REMOVE_FROM_NEW_GROUPCHAT',
  username,
});