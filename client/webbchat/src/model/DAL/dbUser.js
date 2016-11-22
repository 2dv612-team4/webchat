

export const sendFriendRequestTo = (username) => 
  fetch(`${serverUrl}friends/sendrequest/${username}`,
    { method: 'POST' });


export const getAllFriends = () => {

};

export const getAllUsersContaining = (query) => {

};
