
export const addUser = () => {

  return {};
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