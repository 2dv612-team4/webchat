
const serverUrl = 'http://localhost:4000/';

export const sendFriendRequestTo = (username) => 
  fetch(`${serverUrl}friends/sendrequest/${username}`,
    { method: 'POST' });

export const getAllFriends = () => 
  fetch(`${serverUrl}friends/`);

export const getAllUsersContaining = (query) => 
  fetch(`${serverUrl}users/search/${query}`);
