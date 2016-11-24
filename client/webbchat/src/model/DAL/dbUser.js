
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

export const acceptFriendRequest = (id) =>
  fetch(`/friends/acceptrequest/${id}`,
    { method: 'POST',
      credentials: 'include' } );

export const rejectFriendRequest = (id) =>
  fetch(`/friends/rejectrequest/${id}`,
    { method: 'POST',
      credentials: 'include' } );
