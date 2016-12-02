import React from 'react';
import FriendList from './friends/Users';
import FindUserList from './others/Users';
import Pending from './pending/Users';

const UserList = () => (
  <div>
    Friends:
    <FriendList />
    Other: 
    <FindUserList />
    Pending
    <Pending />
  </div>
);


export default UserList;

