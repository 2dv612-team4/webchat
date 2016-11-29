
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

export const updateSnackbar = (snackbar) => {
  return {
    type: 'UPDATE_SNACKBAR',
    snackbar,
  };
};

