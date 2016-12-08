import React from 'react';
import FriendList from './friends/Users';
import FindUserList from './others/Users';
import Pending from './pending/Users';

const UserList = () => (
  <div>
    <p>Friends:</p>
    <FriendList />
    <p>Other:</p>
    <FindUserList />
    <p>Pending</p>
    <Pending />
  </div>
);


export default UserList;
