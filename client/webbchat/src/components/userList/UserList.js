import React from 'react';
import FriendList from './friends/App';
import FindUserList from './others/App';

const UserList = () => (
  <div>
    Friends:
    <FriendList />
    Other: 
    <FindUserList />
  </div>
);


export default UserList;

