
//const serverUrl = 'http://localhost:4000/';

export const sendFriendRequestTo = (username) =>
  fetch(`/friends/sendrequest/${username}`,
    { method: 'POST',
      credentials: 'include' });

export const getAllFriends = () =>
  fetch(`/friends/`,
    { credentials: 'include' } );

export const getAllUsersContaining = (query) =>
  fetch(`/users/search/${query}`,
    { credentials: 'include' });

export const getAllPendingRequests = () =>
  fetch(`/pending/`,
    { credentials: 'include' } );
