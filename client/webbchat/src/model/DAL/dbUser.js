
//const serverUrl = 'http://localhost:4000/';

export const getAllUsersContaining = (query) =>
  fetch(`/users/search/${query}`,
    { credentials: 'include' });

export const getSocketsToken = (id) =>
  fetch(`/users/sockettoken`,
    { method: 'POST',
      credentials: 'include' } );
